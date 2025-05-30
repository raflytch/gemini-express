import { GoogleGenAI } from "@google/genai";
import config from "../config";
import { GenerationError } from "../common/types/generate.type";

export const createGenerateService = () => {
  const genAI = new GoogleGenAI({ apiKey: config.geminiApiKey });

  const generateContent = async (prompt: string): Promise<string> => {
    try {
      const result = await genAI.models.generateContent({
        model: "gemini-2.5-pro-preview-05-06",
        contents: prompt,
      });

      const text = result.text;

      if (!text) {
        throw new Error("No content generated");
      }

      return text;
    } catch (error) {
      const err = error as GenerationError;
      throw new Error(`Failed to generate content: ${err.message}`);
    }
  };

  return { generateContent };
};

export type GenerateService = ReturnType<typeof createGenerateService>;
