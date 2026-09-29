// 배포 후 점검. "초록불인데 페이지는 전부 404" 같은 사고를 잡기 위한 것.
//   - sitemap의 모든 주소가 200이고 제목이 서로 다른가
//   - 옛 블로그 주소 /posts/N이 전부 해당 Blogger 글로 넘어가는가
//   - 없는 주소가 진짜 404를 돌려주는가
// 사용: node scripts/smoke.mjs [사이트 주소]   (기본: 운영 주소)
import { readFileSync } from "node:fs";

const SITE = "https://rkdgusrn1212.github.io";
const base = (process.argv[2] ?? SITE).replace(/\/$/, "");
const map = JSON.parse(readFileSync(new URL("../app/data/blogger-map.json", import.meta.url), "utf8"));

async function check() {
  const fails = [];
  const get = (path) => fetch(base + path, { redirect: "follow" });

  const sitemap = await get("/sitemap.xml");
  if (sitemap.status !== 200) return [`sitemap.xml → ${sitemap.status}`];
  const paths = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, ""));
  const titles = new Map();
  for (const p of paths) {
    // sitemap 주소는 canonical 형태 그대로 바로 200이어야 한다 (리다이렉트되면 canonical이 어긋난 것)
    const res = await fetch(base + p, { redirect: "manual" });
    const title = (await res.text()).match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
    if (res.status !== 200) fails.push(`${p} → ${res.status}`);
    if (!title) fails.push(`${p} → 제목 없음`);
    if (titles.has(title)) fails.push(`${p} → 제목 중복 (${titles.get(title)}와 같음: ${title})`);
    titles.set(title, p);
  }

  for (const { oldPath, bloggerUrl } of map.posts) {
    const res = await get(oldPath);
    const html = await res.text();
    if (res.status !== 200 || !html.includes(`url=${bloggerUrl}`)) fails.push(`${oldPath} → Blogger 이동 누락 (${res.status})`);
  }

  const missing = await get("/__smoke_should_not_exist__");
  if (missing.status !== 404) fails.push(`없는 주소 → ${missing.status} (404여야 함)`);

  console.log(`페이지 ${paths.length}개 · 옛 주소 ${map.posts.length}개 · 404 확인`);
  return fails;
}

// 배포 직후 CDN 반영이 늦을 수 있어 몇 번 다시 본다
for (let attempt = 1; attempt <= 6; attempt++) {
  const fails = await check();
  if (!fails.length) {
    console.log(`통과 (${base})`);
    process.exit(0);
  }
  console.log(`[${attempt}/6] 실패 ${fails.length}건\n  ${fails.slice(0, 10).join("\n  ")}`);
  if (attempt < 6) await new Promise((r) => setTimeout(r, 15000));
}
process.exit(1);
