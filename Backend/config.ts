/** Centralized config from environment */
const frontendUrls = (process.env.FRONTEND_URL ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

export const config = {
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  frontendUrls,
  allowPublicRegistration: process.env.ALLOW_PUBLIC_REGISTRATION === "true",
  isProduction: process.env.NODE_ENV === "production",
  retryMs: 10000,
  resendApiKey: process.env.RESEND_API_KEY,
  notifyEmail: process.env.NOTIFY_EMAIL || "nazarov.davit17@gmail.com",
  notifyFrom: process.env.NOTIFY_FROM || "Portfolio <onboarding@resend.dev>",
  openRouterApiKey: process.env.OPENROUTER_API_KEY,
  openRouterModel: process.env.OPENROUTER_MODEL || "google/gemma-4-26b-a4b-it:free",
  openRouterSiteUrl: process.env.OPENROUTER_SITE_URL || process.env.FRONTEND_URL || "http://localhost:5173",
  openRouterAppName: process.env.OPENROUTER_APP_NAME || "Davit Nazarov Portfolio",
} as const;
