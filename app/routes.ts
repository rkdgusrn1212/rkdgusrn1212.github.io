import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // 프로젝트 상세: 페이지 폴더 안에 그 페이지의 이미지·영상을 같이 둔다
  route("projects/gomoku", "routes/projects/gomoku/route.tsx"),
  route("projects/lis", "routes/projects/lis/route.tsx"),
  // 현업 사례: 개념도와 가상 데이터 체험만 둔다
  route("work/lab", "routes/work/lab/route.tsx"),
  route("work/cdw", "routes/work/cdw/route.tsx"),
  route("work/stats", "routes/work/stats/route.tsx"),
  // 옛 블로그 주소 → Blogger
  route("posts/:n", "routes/legacy-post.tsx"),
  route("sitemap.xml", "routes/sitemap.ts"),
  route("not-found", "routes/not-found.tsx"),
  route("*", "routes/not-found.tsx", { id: "splat" }),
] satisfies RouteConfig;
