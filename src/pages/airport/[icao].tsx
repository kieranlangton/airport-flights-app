import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import AirportInformation from "../../components/AirportInformation";
import ArrivalDepartureToggle, {
  FlightListToShow,
} from "../../components/ArrivalDepartureToggle";
import DelaysGraph from "../../components/DelaysGraph";
import FlightCard from "../../components/FlightCard";
import { getAirportData } from "../../services/api";

export default function AirportDetailPage() {
  const [flightListToShow, setFlightListToShow] = useState(
    FlightListToShow.ARRIVALS
  );
  const router = useRouter();

  // Query params can be an array, guard against this
  const icaoCode = Array.isArray(router.query.icao)
    ? router.query.icao[0]
    : router.query.icao;

  const { isLoading, error, data } = useQuery(["airport", icaoCode], () =>
    router.isReady ? getAirportData(icaoCode) : null
  );

  const dataToShow =
    flightListToShow === FlightListToShow.ARRIVALS
      ? data?.arrivals
      : data?.departures;

  return (
    <div className="container mx-auto">
      <Head>
        <title>{data?.airport?.fullName}</title>
      </Head>

      <header className="p-8 top-0 z-50 bg-white sm:sticky">
        <Link
          href="/"
          className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-pink-50 text-pink-600 hover:bg-pink-100 hover:text-pink-700 focus:ring-pink-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mb-4"
        >
          Back to search
        </Link>
        <div className="flex sm:space-x-3 flex-col sm:flex-row">
          {data?.airport && <AirportInformation airport={data.airport} />}
          <DelaysGraph />
        </div>
        <ArrivalDepartureToggle
          flightListToShow={flightListToShow}
          onChange={(newFlightList) => setFlightListToShow(newFlightList)}
        />
      </header>

      <main>
        <ul className="divide-y px-8 divide-slate-100">
          {dataToShow?.map((flight) => (
            <FlightCard key={flight.number} flight={flight} />
          ))}
        </ul>
      </main>
    </div>
  );
}
