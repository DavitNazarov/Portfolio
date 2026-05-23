import type { CorsOptions } from "cors";
import { config } from "../config.js";

function allowedOrigins() {
  return new Set(
    config.isProduction
      ? config.frontendUrls
      : [...config.frontendUrls, "http://localhost:5173", "http://127.0.0.1:5173"]
  );
}

export function corsOptions(): CorsOptions {
  const origins = allowedOrigins();

  return {
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      return callback(null, origins.has(origin));
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  };
}
