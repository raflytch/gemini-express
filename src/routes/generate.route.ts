import { Router } from 'express';
import { createGenerateController } from '../controllers/generate.controller';
import { generateRateLimiter } from '../middlewares/rate-limiter';
import { validateGenerateRequest } from '../validator/generate.validator';

const router = Router();
const generateController = createGenerateController();

router.post(
  '/content',
  generateRateLimiter,
  validateGenerateRequest,
  (req, res) => generateController.generateContent(req, res)
);

export default router;