declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPEN_AI_API_KEY: string;
      NODE_ENV: "development" | "production";
      BUCKET: string;
      AWS_KEY: string;
      AWS_ACCESS_KEY_ID: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
