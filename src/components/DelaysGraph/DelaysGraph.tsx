import { getDelayGraph } from "../../services/delayGraph";
import { FlightDelay } from "../../types/airport";

interface DelaysGraphProps {
  delays: FlightDelay[];
}

const DelaysGraph = ({ delays }: DelaysGraphProps) => {
  const width = 200;
  const height = 100;
  const padding = 10;

  const { xAxisTicks, xGap, departureLinePath, arrivalLinePath } =
    getDelayGraph(delays, {
      width,
      height,
      padding,
    });

  return (
    <div className="mt-4 sm:mt-0">
      <p className="text-xs tracking-wide uppercase sm:text-center leading-5">
        <span className="bg-sky-500 text-white rounded-full py-1 px-2">
          Arrival
        </span>{" "}
        and{" "}
        <span className="bg-green-500 text-white rounded-full py-1 px-2">
          Departure
        </span>{" "}
        <br />
        delays (Past 12 hours)
      </p>
      <svg width={width} height={height}>
        {xAxisTicks.map((tick, i) => (
          <line
            key={tick.valueOf()}
            x1={padding + i * xGap}
            y1={padding}
            x2={padding + i * xGap}
            y2={height - padding}
            className="stroke-slate-100 stroke-1"
          />
        ))}
        {departureLinePath && (
          <path
            d={departureLinePath}
            className="fill-none stroke-sky-500 stroke-3"
            strokeLinecap="round"
          />
        )}
        {arrivalLinePath && (
          <path
            d={arrivalLinePath}
            className="fill-none stroke-green-500 stroke-3"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
};

export default DelaysGraph;
