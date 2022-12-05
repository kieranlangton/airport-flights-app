import dayjs from "dayjs";
import qs from "qs";
import {
  Airport,
  AirportSearchResult,
  Flight,
  FlightDelay,
} from "../types/airport";

export class AirportApiRequestError extends Error {
  public status: number;
  public details: string | {};

  constructor(status: number, details: string | {}) {
    super();
    this.status = status;
    this.details = details;
  }
}

export const sortFlights = (flights?: Flight[]) => {
  return flights
    ?.slice(0)
    .sort((a, b) =>
      dayjs(b.movement.actualTimeUtc).isBefore(a.movement.actualTimeUtc)
        ? 1
        : -1
    );
};

async function airportApiFetcher<T>(
  endpoint: string,
  params?: {}
): Promise<T | null> {
  try {
    const host = process.env.NEXT_PUBLIC_AERODATABOX_API_HOST;
    const apiKey = process.env.NEXT_PUBLIC_AERODATABOX_API_KEY;

    if (!host || !apiKey) {
      throw new Error("API host or key missing");
    }

    let requestUrl = `https://${host}${endpoint}`;

    if (params) {
      requestUrl += `?${qs.stringify(params)}`;
    }

    const response = await fetch(requestUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": host,
      },
    });

    if (response.status >= 400) {
      const contentType = response.headers.get("content-type");
      let error;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        error = await response.json();
      } else {
        error = await response.text();
      }
      console.log(error);
      throw new AirportApiRequestError(response.status, error);
    }

    if (response.status === 204) {
      return null;
    }

    const json = await response.json();

    return json;
  } catch (err) {
    throw err;
  }
}

export const getAirportSearchResults = async (searchTerm: string) => {
  if (!searchTerm) {
    return null;
  }

  const results = await airportApiFetcher<{ items: AirportSearchResult[] }>(
    "/airports/search/term",
    {
      q: searchTerm.toLowerCase(),
      limit: 10,
      withFlightInfoOnly: true,
    }
  );

  return results?.items;
};

export const getAirportData = async (icaoCode?: string) => {
  if (!icaoCode) {
    throw new Error("No ICAO code provided");
  }

  const airportRequest = airportApiFetcher<Airport>(
    `/airports/icao/${icaoCode}`
  );

  // flight arrival and departure data for the next hour
  const flightDataFrom = dayjs().format();
  const flightDataTo = dayjs().add(1, "hour").format();

  const flightDataRequest = airportApiFetcher<{
    arrivals: Flight[];
    departures: Flight[];
  }>(`/flights/airports/icao/${icaoCode}/${flightDataFrom}/${flightDataTo}`);

  // delay data for the preceding 12 hours, starting on the hour
  const delaysFrom = dayjs().minute(0).subtract(12, "hours").format();
  const delaysTo = dayjs().minute(0).format();

  const delaysRequest = airportApiFetcher<FlightDelay[] | null>(
    `/airports/icao/${icaoCode}/delays/${delaysFrom}/${delaysTo}`
  );

  const [airport, flightData, delays] = await Promise.all([
    airportRequest,
    flightDataRequest,
    delaysRequest,
  ]);

  const arrivals = sortFlights(flightData?.arrivals);
  const departures = sortFlights(flightData?.departures);

  return {
    airport,
    arrivals,
    departures,
    delays,
  };
};
