import Link from "next/link";

interface AirportSearchResultProps {
  icao: string;
  name: string;
}

const AirportSearchResult = ({ icao, name }: AirportSearchResultProps) => (
  <div>
    <Link
      href={`/airport/${icao}`}
      className="group block items-center rounded-full text-sm font-semibold px-3 py-2 focus:outline-none focus:ring-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-700 focus:ring-indigo-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-1"
    >
      {name}
    </Link>
  </div>
);

export default AirportSearchResult;
