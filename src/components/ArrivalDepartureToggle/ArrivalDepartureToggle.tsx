export enum FlightListToShow {
  ARRIVALS = "Arrivals",
  DEPARTURES = "Departures",
}

interface ArrivalDepartureToggleProps {
  flightListToShow: FlightListToShow;
  onChange: (flightListToShow: FlightListToShow) => void;
}

const ArrivalDepartureToggle = ({
  flightListToShow,
  onChange,
}: ArrivalDepartureToggleProps) => {
  return (
    <nav className="pt-4 text-sm font-medium">
      <ul className="flex space-x-3">
        <li>
          <button
            onClick={() => onChange(FlightListToShow.ARRIVALS)}
            className={`block px-3 py-2 rounded-md ${
              flightListToShow === FlightListToShow.ARRIVALS
                ? "bg-sky-500 text-white"
                : "bg-slate-50"
            }`}
          >
            Arrivals
          </button>
        </li>
        <li>
          <button
            onClick={() => onChange(FlightListToShow.DEPARTURES)}
            className={`block px-3 py-2 rounded-md ${
              flightListToShow === FlightListToShow.DEPARTURES
                ? "bg-sky-500 text-white"
                : "bg-slate-50"
            }`}
          >
            Departures
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ArrivalDepartureToggle;
