import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Env file loading (automatic, no extra config needed):
 *   npm run dev   → loads .env + .env.local
 *   npm run build → loads .env + .env.production  ← sets VITE_API_BASE_URL to live API
 *
 * Only variables prefixed with VITE_ are exposed to the browser bundle.
 */
export default defineConfig(({ mode }) => ({
  plugins: [react()],

  build: {
    // Source maps in dev/staging, disabled in production for smaller bundles
    sourcemap: mode !== "production",

    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
