import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Forward /chat and /personas calls to the backend during development
      "/chat": "http://localhost:3001",
      "/personas": "http://localhost:3001",
    },
  },
});
