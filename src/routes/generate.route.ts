import { Router } from "express";
import { createGenerateController } from "../controllers/generate.controller";
import { generateRateLimiter } from "../middlewares/rate-limiter";
import { validateGenerateRequest } from "../validator/generate.validator";

// Create router
const router = Router();
// Initialize controller
const controller = createGenerateController();

// Configure POST endpoint with middleware
router.post(
  "/content",
  generateRateLimiter, // Limit requests
  validateGenerateRequest, // Validate input
  controller.generateContent // Process request
);

export default router;
