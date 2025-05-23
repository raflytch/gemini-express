import { z } from "zod";

export const GenerateRequestSchema = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty"),
});

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

export interface GenerateResponse {
  success: boolean;
  data?: string;
  message?: string;
}

export interface GenerationError {
  message: string;
  code?: number;
}
