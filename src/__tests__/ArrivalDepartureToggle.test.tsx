import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ArrivalDepartureToggle, {
  FlightListToShow,
} from "../components/ArrivalDepartureToggle";

test("displays the correct active state for arrivals", async () => {
  const component = render(
    <ArrivalDepartureToggle
      flightListToShow={FlightListToShow.ARRIVALS}
      onChange={() => {}}
    />
  );

  const arrivalButton = await component.findByText("Arrivals");

  expect(arrivalButton.classList.contains("bg-sky-500")).toBe(true);
});

test("displays the correct active state for departures", async () => {
  const component = render(
    <ArrivalDepartureToggle
      flightListToShow={FlightListToShow.DEPARTURES}
      onChange={() => {}}
    />
  );

  const arrivalButton = await component.findByText("Departures");

  expect(arrivalButton.classList.contains("bg-green-500")).toBe(true);
});

test("displays the correct active state for departures", async () => {
  const mockChange = jest.fn();

  const component = render(
    <ArrivalDepartureToggle
      flightListToShow={FlightListToShow.DEPARTURES}
      onChange={mockChange}
    />
  );

  const arrivalButton = await component.findByText("Arrivals");

  fireEvent(
    arrivalButton,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(mockChange).toHaveBeenCalled();
  expect(mockChange.mock.calls).toEqual([[FlightListToShow.ARRIVALS]]);
});
