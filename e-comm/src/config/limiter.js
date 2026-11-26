import { rateLimit } from "express-rate-limit";

export let signUpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 5,
  message: {
    success: false,
    status: 409,
    message: "To many requests",
  },
});

export let productsLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  message: {
    success: false,
    status: 409,
    message: "To many requests",
  },
});
