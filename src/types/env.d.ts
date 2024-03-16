declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      HTTP_SERVER_PORT: number;
      SECRET: string;
      CIPHER_TEXT_SECRET: string;
    }
  }
}

export {};
