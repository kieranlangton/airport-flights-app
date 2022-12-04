import searchResults from "../mockData/search.json";
import airport from "../mockData/airport.json";
import flightData from "../mockData/arrivals-departures.json";
import dayjs from "dayjs";

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

  const arrivals = flightData.arrivals
    ?.slice(0)
    .sort((a, b) =>
      dayjs(b.movement.actualTimeUtc).isBefore(a.movement.actualTimeUtc)
        ? 1
        : -1
    );

  const departures = flightData.departures
    ?.slice(0)
    .sort((a, b) =>
      dayjs(b.movement.actualTimeUtc).isBefore(a.movement.actualTimeUtc)
        ? 1
        : -1
    );

  return {
    airport,
    arrivals,
    departures,
  };
};
