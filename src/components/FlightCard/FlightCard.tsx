import dayjs from "dayjs";
import { Flight } from "../../types/airport";

interface FlightCardProps {
  flight: Flight;
}

const FlightCard = ({ flight }: FlightCardProps) => {
  return (
    <article className="flex items-start space-x-6 py-6">
      <div className="min-w-0 relative flex-auto">
        <h2 className="font-semibold text-slate-900 truncate pr-20">
          {flight.number}, {flight.movement.airport.name}
        </h2>
        <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
          <div className="absolute top-0 right-0 flex items-center space-x-1">
            <dt className="text-sky-500">
              <span className="sr-only">Scheduled time</span>
            </dt>
            <dd>{dayjs(flight.movement.actualTimeLocal).format("HH:mm")}</dd>
          </div>
          {flight.airline?.name && (
            <div>
              <dt className="sr-only">Airline name</dt>
              <dd>{flight.airline.name}</dd>
            </div>
          )}
          {flight.aircraft?.model && (
            <div>
              <dt className="sr-only">Aircraft name</dt>
              <dd className="flex items-center">
                <svg
                  width="2"
                  height="2"
                  fill="currentColor"
                  className="mx-2 text-slate-300"
                  aria-hidden="true"
                >
                  <circle cx="1" cy="1" r="1" />
                </svg>
                {flight.aircraft.model}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </article>
  );
};

export default FlightCard;
