import "dotenv/config";
import { createApp } from "./app.js";
import { config } from "./config.js";
import { retryMongoUntilConnected } from "./db/mongoose.js";

if (!config.jwtSecret) {
  console.error("JWT_SECRET is not set in .env. Login will fail.");
}

const app = createApp();

app.listen(config.port, () => {
  console.log(`Backend listening on port ${config.port}`);
});

void retryMongoUntilConnected();
