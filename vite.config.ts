import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  // 바닥글 저작권 연도. 빌드 시점에 고정해 미리 만든 HTML과 브라우저 렌더링이 어긋나지 않게 한다
  define: {
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  resolve: {
    tsconfigPaths: true,
  },
});
