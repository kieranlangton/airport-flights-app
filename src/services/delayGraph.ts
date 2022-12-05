import dayjs from "dayjs";
import { extent } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { line } from "d3-shape";
import { FlightDelay } from "../types/airport";

type DelayLineDatum = {
  fromUtc: string;
  delayIndex: number;
};

type Dimensions = {
  width: number;
  height: number;
  padding: number;
};

export const getDelayGraph = (
  delaysData: FlightDelay[],
  dimensions: Dimensions
) => {
  // delay data is returned in rolling 2 hour periods, with a gap every 15 minutes
  // filter the data so we get sequential 2 hour periods
  const gaps = delaysData.filter((_, index) => index % 8 === 0);

  const { width, height, padding } = dimensions;

  // delayIndex is a float between 0.0 and 5.0
  const yDomain = [0, 5];
  const yScale = scaleLinear()
    .domain(yDomain)
    .nice(5)
    .range([height - padding, padding]);

  const xDomain = extent(gaps, (d) => dayjs(d.fromUtc).toDate()) as [
    Date,
    Date
  ];
  const xScale = scaleTime()
    .domain(xDomain)
    .range([padding, width - padding]);

  const delayLineFn = line<DelayLineDatum>()
    .x((d) => xScale(dayjs(d.fromUtc).toDate()))
    .y((d) => yScale(d.delayIndex));

  const departureLinePath = delayLineFn(
    gaps.map((datum) => ({
      fromUtc: datum.fromUtc,
      delayIndex: datum.departuresDelayInformation.delayIndex || 0,
    }))
  );

  const arrivalLinePath = delayLineFn(
    gaps.map((datum) => ({
      fromUtc: datum.fromUtc,
      delayIndex: datum.arrivalsDelayInformation.delayIndex || 0,
    }))
  );

  const xAxisTicks = xScale.ticks(gaps.length);

  const xGap = (width - padding * 2) / (xAxisTicks.length - 1);

  return {
    xAxisTicks,
    xGap,
    departureLinePath,
    arrivalLinePath,
  };
};
