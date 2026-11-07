// import { defineConfig, loadEnv } from "vite";

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), "");

//   return {
//     // Keep your existing plugins here.
//     server: {
//       proxy: {
//         "/sports-api": {
//           target: "https://www.realtimesportsapi.com",
//           changeOrigin: true,
//           rewrite: (path) => path.replace(/^\/sports-api/, "/api/v1"),
//           headers: {
//             Authorization: `Bearer ${env.REALTIME_SPORTS_API_KEY}`,
//           },
//         },
//       },
//     },
//   };
// });
import { defineConfig } from "vite";

export default defineConfig({
  // Keep your existing plugins here
  server: {
    proxy: {
      "/nba-live": {
        target: "https://cdn.nba.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nba-live/, ""),
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