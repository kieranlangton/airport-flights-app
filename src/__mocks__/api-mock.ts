import dayjs from "dayjs";
import searchResults from "./data/search.json";
import airport from "./data/airport.json";
import flightData from "./data/arrivals-departures.json";
import delays from "./data/delays.json";
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

  const arrivals = sortFlights(flightData.arrivals);
  const departures = sortFlights(flightData.departures);

  return {
    airport,
    arrivals,
    departures,
    delays,
  };
};
