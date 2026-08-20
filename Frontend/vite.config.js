import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        // Framework and animation code changes far less often than app code —
        // splitting them keeps the big chunks cached across deploys.
        manualChunks: {
          react: ["react", "react-dom", "react-dom/client", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
