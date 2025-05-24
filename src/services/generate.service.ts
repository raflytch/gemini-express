import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerationConfig,
  SafetySetting,
  GenerativeModel,
} from "@google/generative-ai";
import config from "../config";
import { GenerationError } from "../common/types/generate.type";

export const createGenerateService = () => {
  // Initialize API client
  const genAI = new GoogleGenerativeAI(config.geminiApiKey);

  // Use correct model ID
  const modelName = "gemini-2.0-flash-lite";

  const generateContent = async (prompt: string): Promise<string> => {
    try {
      // Configure generation parameters
      const generationConfig: GenerationConfig = {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      };

      // Configure safety settings
      const safetySettings: SafetySetting[] = [
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

      // Initialize model with settings
      const model: GenerativeModel = genAI.getGenerativeModel({
        model: modelName,
        generationConfig,
        safetySettings,
      });

      // Generate and return content
      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      // Handle API errors
      const err = error as GenerationError;
      throw new Error(`Failed to generate content: ${err.message}`);
    }
  };

  return {
    generateContent,
  };
};

export type GenerateService = ReturnType<typeof createGenerateService>;
