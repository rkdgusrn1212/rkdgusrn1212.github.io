// GitHub Pages는 없는 주소에 404.html을 돌려준다. React Router는 그 역할의 파일을
// __spa-fallback.html이라는 이름으로 만들기 때문에 이름만 맞춰 복사한다. (빌드 절차의 유일한 우회책)
import { copyFileSync, existsSync } from "node:fs";

const from = "build/client/__spa-fallback.html";
if (!existsSync(from)) throw new Error(`${from}이 없습니다. react-router.config.ts의 prerender 설정을 확인하세요.`);
copyFileSync(from, "build/client/404.html");
console.log("404.html 생성");
