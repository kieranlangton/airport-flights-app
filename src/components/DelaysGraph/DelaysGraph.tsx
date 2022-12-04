import delays from "../../mockData/delays.json";
import { getDelayGraph } from "../../services/delayGraph";

const DelaysGraph = () => {
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
        <span className="bg-green-300 rounded-full py-1 px-2">Departure</span>{" "}
        and <span className="bg-sky-300 rounded-full py-1 px-2">Arrival</span>{" "}
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
            className="stroke-slate-200 stroke-1"
          />
        ))}
        {departureLinePath && (
          <path
            d={departureLinePath}
            className="fill-none stroke-sky-300 stroke-3"
            strokeLinecap="round"
          />
        )}
        {arrivalLinePath && (
          <path
            d={arrivalLinePath}
            className="fill-none stroke-green-300 stroke-3"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
};

export default DelaysGraph;
