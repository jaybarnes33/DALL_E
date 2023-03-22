import { Configuration, OpenAIApi } from "openai";

export const openAiConnect = async () => {
  const config = new Configuration({ apiKey: process.env.OPEN_AI_API_KEY });

  const openai = new OpenAIApi(config);

  return openai;
};
