import { Request, Response, NextFunction } from "express";
import { GenerateRequestSchema } from "../common/types/generate.type";
import { ZodError } from "zod";

export const validateGenerateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    GenerateRequestSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
      return;
    }

    res.status(400).json({
      success: false,
      message: "Invalid request data",
    });
  }
};
