import { act, render } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import AirportSearchPage from "../pages/index";
import AirportDetailPage from "../pages/airport/[icao]";
import { QueryClient, QueryClientProvider } from "react-query";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("../services/api", () => require("../__mocks__/api-mock"));

mockRouter.useParser(
  createDynamicRouteParser([
    // These paths should match those found in the `/pages` folder:
    "/",
    "/airport/[icao]",
  ])
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

it("renders search page unchanged", async () => {
  let container;
  await act(async () => {
    ({ container } = render(
      <QueryClientProvider client={queryClient}>
        <AirportSearchPage />
      </QueryClientProvider>
    ));
  });
  expect(container).toMatchSnapshot();
});

it("renders detail page unchanged", async () => {
  await act(async () => {
    mockRouter.setCurrentUrl("/airport/EGLL");
  });

  global.scrollTo = jest.fn();

  let container;
  await act(async () => {
    ({ container } = render(
      <QueryClientProvider client={queryClient}>
        <AirportDetailPage />
      </QueryClientProvider>
    ));
  });
  expect(container).toMatchSnapshot();
});
