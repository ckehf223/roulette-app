import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // 글로벌 변수를 빈 객체로 정의
  },
  // server: {
    // proxy: {
    //   "/api": {
    //     target: "http://13.209.15.193:8080",
    //     // target: "http://localhost:8080",
    //     changeOrigin: true,
    //     // rewrite 제거!
    //   },
    // },
  // },
});
