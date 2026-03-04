import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react"; 
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port:3201,
    sourcemapIgnoreList: () => true,
  },
  preview:{
    port:3201,
    host: '127.0.0.1',
    allowedHosts: ['medhist.mmabitec.me',"www.medhist.mmabitec.me"],
  },
  css: {
    devSourcemap: false,
  },
  build: {
    sourcemap: false,
    minify: "oxc",
    rollupOptions: { output: {} },
  },
});
