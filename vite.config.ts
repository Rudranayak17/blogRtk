import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows Vite to use the same hostname as the client
    proxy: {
      "/api/v1": "http://localhost:4000",
    },
  },
});
