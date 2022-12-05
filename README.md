# Airport Arrivals and Departures

This is a small app that lets you search for an airport and then view its upcoming arrival and departure flights, along with a graph of delays for the previous 12 hours. Built using the [AeroDataBox API](https://doc.aerodatabox.com/) through [RapidAPI](https://rapidapi.com/aedbx-aedbx/api/aerodatabox/).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### API Key

Create a [RapidAPI](https://rapidapi.com/hub) account and subscribe to the [AeroDataBox API free "Basic" plan](https://rapidapi.com/aedbx-aedbx/api/aerodatabox/pricing). Once subscribed, obtain the API key from your newly create App by going to [My Apps](https://rapidapi.com/developer/apps) -> default-application_0123456 -> Security, and copying the API key.

**Note: The Basic plan has low limits, ~400 calls/month**

### Production

Prerequisites: Docker, an API key

```bash
# build the Docker image
$ docker build \
    --build-arg NEXT_PUBLIC_AERODATABOX_API_HOST=aerodatabox.p.rapidapi.com \
    --build-arg NEXT_PUBLIC_AERODATABOX_API_KEY=<API KEY> \
    -t airport-flights-app .
# run the container
$ docker run -p 3000:3000 airport-flights-app
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Development

Prerequisites: Node.js v16, Yarn v1, an API key

Create a `.env.local` file with the following contents:

```
NEXT_PUBLIC_AERODATABOX_API_HOST=aerodatabox.p.rapidapi.com
NEXT_PUBLIC_AERODATABOX_API_KEY=<API KEY>
```

```bash
# install dependencies
$ yarn
# run the development server
$ yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Things for the future

- More unit tests
- End-to-end tests with Cypress
- Add a dockerfile for development
- [Prettier](https://prettier.io/) setup
