import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import config from "../config";
import { GenerationError } from "../common/types/generate.type";

export const createGenerateService = () => {
  const genAI = new GoogleGenerativeAI(config.geminiApiKey);
  const modelName = "gemini-1.5-flash";

  const generateContent = async (prompt: string): Promise<string> => {
    try {
      const generationConfig = {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig,
        safetySettings,
      });

      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      const err = error as GenerationError;
      throw new Error(`Failed to generate content: ${err.message}`);
    }
  };

  return {
    generateContent,
  };
};

export type GenerateService = ReturnType<typeof createGenerateService>;
