import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";
import { getAirportSearchResults } from "../services/api";

export default function AirportSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, error, data } = useQuery(["search", searchTerm], () =>
    getAirportSearchResults(searchTerm)
  );
  console.log("data", data);

  return (
    <div>
      <Head>
        <title>Airport Search</title>
      </Head>

      <main>
        <input
          className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </main>
      {data &&
        data.map((d) => (
          <div key={d.icao}>
            <Link href={`/airport/${d.icao}`}>{d.name}</Link>
          </div>
        ))}
    </div>
  );
}
