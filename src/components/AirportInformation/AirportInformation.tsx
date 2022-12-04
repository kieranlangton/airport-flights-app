import { Airport } from "../../types/airport";

interface AirportInformationProps {
  airport: Airport;
}

const AirportInformation = ({ airport }: AirportInformationProps) => {
  return (
    <div className="grow">
      <h1 className="text-3xl font-bold mb-2">{airport.fullName}</h1>
      <p>
        <span className="px-1.5 mr-2 ring-1 ring-slate-200 rounded">
          {airport.iata}
        </span>
        <span className="px-1.5 mr-2 ring-1 ring-slate-200 rounded">
          {airport.country.name}
        </span>
        <span className="px-1.5 mr-2 ring-1 ring-slate-200 rounded">
          {airport.continent.name}
        </span>
      </p>
      {airport.urls.googleMaps && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={airport.urls.googleMaps}
          className="group inline-flex items-center h-9 mr-4 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-700 focus:ring-indigo-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-8"
        >
          Google Maps
          <svg
            className="overflow-visible ml-3 text-indigo-300 group-hover:text-indigo-400 dark:text-slate-500 dark:group-hover:text-slate-400"
            width="3"
            height="6"
            viewBox="0 0 3 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0L3 3L0 6"></path>
          </svg>
        </a>
      )}
      {airport.urls.flightRadar && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={airport.urls.flightRadar}
          className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-700 focus:ring-indigo-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-8"
        >
          Flight Radar
          <svg
            className="overflow-visible ml-3 text-indigo-300 group-hover:text-indigo-400 dark:text-slate-500 dark:group-hover:text-slate-400"
            width="3"
            height="6"
            viewBox="0 0 3 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0L3 3L0 6"></path>
          </svg>
        </a>
      )}
    </div>
  );
};

export default AirportInformation;
