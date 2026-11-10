import { defineConfig } from "vite";

export default defineConfig({
  // Keep your existing plugins here
  server: {
    proxy: {
      "/nba-live": {
        target: "https://cdn.nba.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nba-live/, ""),
        headers: {
          Referer: "https://www.nba.com/",
          "User-Agent": "Mozilla/5.0",
        },
      },

      "/nba-stats": {
        target: "https://stats.nba.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nba-stats/, ""),
        headers: {
          Referer: "https://www.nba.com/",
          "User-Agent": "Mozilla/5.0",
        },
      },
    },
  },
});