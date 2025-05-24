import { Request, Response } from "express";
import { createGenerateService } from "../services/generate.service";
import {
  GenerateRequest,
  GenerateResponse,
} from "../common/types/generate.type";

export const createGenerateController = () => {
  // Initialize service
  const generateService = createGenerateService();

  const generateContent = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      // Extract prompt from request
      const { prompt } = req.body as GenerateRequest;

      // Generate content using service
      const generatedContent = await generateService.generateContent(prompt);

      // Create success response
      const response: GenerateResponse = {
        success: true,
        data: generatedContent,
      };

      res.status(200).json(response);
    } catch (error) {
      // Handle errors
      const err = error as Error;
      const response: GenerateResponse = {
        success: false,
        message: err.message || "Error generating content",
      };

      res.status(500).json(response);
    }
  };

  return {
    generateContent,
  };
};

export type GenerateController = ReturnType<typeof createGenerateController>;
