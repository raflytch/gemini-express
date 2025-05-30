import { Router } from "express";
import { createGenerateController } from "../controllers/generate.controller";
import { generateRateLimiter } from "../middlewares/rate-limiter";
import { validateGenerateRequest } from "../validator/generate.validator";

const router = Router();
const controller = createGenerateController();

router.post(
  "/content",
  generateRateLimiter,
  validateGenerateRequest,
  controller.generateContent
);

export default router;
