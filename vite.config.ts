// vite.config.ts
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/Portfolio_01/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    rollupOptions: {
      // Multi-page build: each case study is a real URL that works on GitHub Pages.
      input: {
        main: resolve(__dirname, "index.html"),
        optiapply: resolve(__dirname, "work/optiapply/index.html"),
        reelpick: resolve(__dirname, "work/reelpick/index.html"),
        consciousConnections: resolve(__dirname, "work/conscious-connections/index.html"),
        buildPipeline: resolve(__dirname, "work/builds/3d-pipeline/index.html"),
        buildDetente: resolve(__dirname, "work/builds/detente/index.html"),
        buildVoice: resolve(__dirname, "work/builds/voice-agent/index.html"),
      },
    },
  },
});
