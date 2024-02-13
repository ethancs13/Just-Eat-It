import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/graphql": {
        target: "https://just-eat-it-test-a5e86dcbbf47.herokuapp.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
