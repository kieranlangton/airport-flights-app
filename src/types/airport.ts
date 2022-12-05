export type Flight = {
  movement: {
    airport: {
      icao: string;
      iata: string;
      name: string;
    };
    scheduledTimeLocal: string;
    actualTimeLocal: string;
    actualTimeUtc: string;
  };
  number: string;
  status: string;
  aircraft: {
    model?: string;
  };
  airline: {
    name?: string;
  };
};

export type Airport = {
  icao: string;
  iata: string;
  shortName?: string;
  fullName: string;
  municipalityName: string;
  location: {
    lat: number;
    lon: number;
  };
  country: {
    code: string;
    name?: string;
  };
  continent: {
    code: string;
    name?: string;
  };
  timeZone: string;
  urls: {
    webSite?: string;
    wikipedia?: string;
    twitter?: string;
    googleMaps?: string;
    flightRadar?: string;
  };
};

export type AirportSearchResult = {
  icao: string;
  iata: string;
  name: string;
  shortName: string;
  municipalityName: string;
  location: {
    lat: number;
    lon: number;
  };
  countryCode: string;
};

export type FlightDelay = {
  airportIcao: string;
  fromUtc: string;
  toUtc: string;
  departuresDelayInformation: {
    delayIndex?: number;
  };
  arrivalsDelayInformation: {
    delayIndex?: number;
  };
};
