import Head from "next/head";
import { useState } from "react";
import { useQuery } from "react-query";
import AircraftIcon from "../components/AircraftIcon";
import AirportSearchField from "../components/AirportSearchField";
import AirportSearchResult from "../components/AirportSearchResult";
import LoadingSpinner from "../components/LoadingSpinner";
import { getAirportSearchResults } from "../services/api-mock";

export default function AirportSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, error, data } = useQuery(["search", searchTerm], () =>
    getAirportSearchResults(searchTerm)
  );

  const noResults =
    !isLoading && (error || (searchTerm.length > 0 && data?.length === 0));

  return (
    <div className="container mx-auto p-8">
      <Head>
        <title>Airport Search</title>
      </Head>

      <main>
        <AircraftIcon />
        <div className="flex justify-center">
          <div className="sm:w-96">
            <AirportSearchField onSubmit={setSearchTerm} />
            {isLoading && (
              <div className="text-center my-8">
                <LoadingSpinner />
              </div>
            )}
            {noResults && (
              <div className="text-center my-8">
                <p className="text-xs tracking-wide uppercase sm:text-center leading-5">
                  No results
                </p>
              </div>
            )}
            {data &&
              data.map((airport) => (
                <AirportSearchResult
                  key={airport.icao}
                  icao={airport.icao}
                  name={airport.name}
                />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
