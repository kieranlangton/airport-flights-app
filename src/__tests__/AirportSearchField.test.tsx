import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AirportSearchField from "../components/AirportSearchField";

const setup = async (submitHandler: (searchTerm: string) => void) => {
  const utils = render(<AirportSearchField onSubmit={submitHandler} />);
  const input = (await utils.getByLabelText("Search")) as HTMLInputElement;
  return {
    input,
    ...utils,
  };
};

test("accepts text input", async () => {
  const submitHandler = () => {};

  const { input } = await setup(submitHandler);
  fireEvent.change(input, { target: { value: "london" } });
  expect(input.value).toBe("london");
});

test("calls submit handler", async () => {
  const mockSubmit = jest.fn();

  const utils = await setup(mockSubmit);
  fireEvent.change(utils.input, { target: { value: "new york" } });

  fireEvent.submit(await utils.getByTestId("form"));

  expect(mockSubmit).toHaveBeenCalled();
  expect(mockSubmit.mock.calls).toEqual([["new york"]]);
});
