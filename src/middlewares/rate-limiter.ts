import rateLimit from "express-rate-limit";

export const generateRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    success: false,
    message: "Too many requests, please try again after a minute",
  },
});
