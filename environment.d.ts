declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_AERODATABOX_API_HOST: string;
      NEXT_PUBLIC_AERODATABOX_API_KEY: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
    }
  }
}
