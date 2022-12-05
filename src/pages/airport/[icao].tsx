import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import AirportInformation from "../../components/AirportInformation";
import ArrivalDepartureToggle, {
  FlightListToShow,
} from "../../components/ArrivalDepartureToggle";
import BackToSearchButton from "../../components/BackToSearchButton";
import DelaysGraph from "../../components/DelaysGraph";
import FlightCard from "../../components/FlightCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { AirportApiRequestError } from "../../services/api";
import { getAirportData } from "../../services/api-mock";

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

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <h2 className="mt-2 text-lg text-slate-700 dark:text-slate-400 sm:mt-0">
          {error instanceof AirportApiRequestError && error.status === 404 ? (
            <>The airport {icaoCode} could not be found.</>
          ) : (
            <>An unexpected error occurred.</>
          )}
        </h2>
        <div className="mt-4">
          <BackToSearchButton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Head>
        <title>{data?.airport?.fullName}</title>
      </Head>

      <header className="p-8 top-0 z-50 bg-white sm:sticky">
        <BackToSearchButton />
        <div className="flex sm:space-x-3 flex-col sm:flex-row">
          <div className="grow">
            {data?.airport && <AirportInformation airport={data.airport} />}
          </div>
          {data?.delays && <DelaysGraph delays={data.delays} />}
        </div>
        <ArrivalDepartureToggle
          flightListToShow={flightListToShow}
          onChange={(newFlightList) => setFlightListToShow(newFlightList)}
        />
        {isLoading && (
          <div className="text-center">
            <LoadingSpinner />
          </div>
        )}
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
