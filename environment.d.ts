declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPEN_AI_API_KEY: string;
      NODE_ENV: "development" | "production";
      BUCKET: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
