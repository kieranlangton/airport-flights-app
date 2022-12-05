import searchResults from "../mockData/search.json";
import airport from "../mockData/airport.json";
import flightData from "../mockData/arrivals-departures.json";
import delays from "../mockData/delays.json";
import dayjs from "dayjs";
import { Flight } from "../types/airport";

export const sortFlights = (flights?: Flight[]) => {
  return flights
    ?.slice(0)
    .sort((a, b) =>
      dayjs(b.movement.actualTimeUtc).isBefore(a.movement.actualTimeUtc)
        ? 1
        : -1
    );
};

export const getAirportSearchResults = async (searchTerm: string) => {
  if (!searchTerm) {
    return null;
  }

  return searchResults.items;
};

export const getAirportData = async (icaoCode?: string) => {
  if (!icaoCode) {
    throw new Error("No ICAO code provided");
  }

  throw new Error("No ICAO code provided");

  const arrivals = sortFlights(flightData.arrivals);
  const departures = sortFlights(flightData.departures);

  return {
    airport,
    arrivals,
    departures,
    delays,
  };
};
