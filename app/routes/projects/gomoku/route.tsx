import type { Route } from "./+types/route";
import { ProjectDetail } from "~/components/project-detail";
import { GomokuScreens } from "~/components/toys/gomoku-screens";
import { getProject, gomokuWeb } from "~/data/projects";
import { seo } from "~/lib/site";
import { gomokuShots, SHOT_HEIGHT, SHOT_WIDTH } from "./shots";

const project = getProject("gomoku");

// 문구는 개발 사례 중심으로 쓴다. 플레이어가 검색하는 표현은 블로그 글의 몫이다 (웹 체험판은 블로그 글로만 연결).
export function meta({}: Route.MetaArgs) {
  return seo({
    title: project.title,
    description: "2018년 출시, 2026년 4.0으로 리뉴얼한 Android 오목 게임. Java 앱과 Spring Boot 온라인 대전 서버를 1인 개발했다. 누적 다운로드 10만+.",
    path: "/projects/gomoku",
  });
}

const VERSIONS = [
  {
    name: "3.0 · 2019",
    title: "서버리스 온라인 대전",
    body: "블루투스·온라인 대전을 추가하면서 서버를 두지 않고 AWS 서버리스로 대전 상태와 턴 타임아웃을 관리했습니다. 관계형 스키마를 키-값 구조로 역정규화했습니다.",
    stack: ["AWS Lambda", "API Gateway", "DynamoDB", "Step Functions"],
  },
  {
    name: "4.0 · 2026",
    title: "Spring Boot로 재구축",
    body: "7년 만의 리뉴얼에서 온라인 대전 서버를 Spring Boot로 다시 만들었습니다. 실시간 대국은 STOMP over WebSocket, 로그인은 Google ID 토큰 검증으로 처리합니다.",
    stack: ["Java 21", "Spring Boot", "WebSocket · STOMP", "OAuth2 Resource Server", "MyBatis", "MariaDB", "Flyway", "Fly.io · Docker"],
  },
];

const ANDROID_STACK = ["Java", "Graphic2D (SurfaceView)", "Bluetooth Classic (RFCOMM)", "Retrofit · OkHttp", "Credential Manager", "AdMob · UMP", "Material Components", "targetSdk 36 · minSdk 23"];

export default function Gomoku() {
  return (
    <ProjectDetail project={project} tryLabel="실제 화면" demo={<GomokuScreens />}>
      <section className="sec" aria-labelledby="shots-title">
        <div className="sec-head">
          <h2 id="shots-title">화면</h2>
          <p className="eyebrow">Google Play에 공개된 4.0 화면</p>
        </div>
        <ul className="gallery">
          {gomokuShots.map((s) => (
            <li key={s.label}>
              <img src={s.src} alt={s.alt} width={SHOT_WIDTH} height={SHOT_HEIGHT} loading="lazy" />
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="sec" aria-labelledby="arch-title">
        <div className="sec-head">
          <h2 id="arch-title">버전별 구조</h2>
        </div>
        <div className="versions">
          {VERSIONS.map((v) => (
            <article key={v.name} className="card version">
              <p className="eyebrow">{v.name}</p>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
              <div className="tags">
                {v.stack.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="card version">
          <p className="eyebrow">Android 앱</p>
          <div className="tags">
            {ANDROID_STACK.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="web" aria-labelledby="web-title">
        <div className="card version web">
          <p className="eyebrow">웹 체험판 · {gomokuWeb.released}</p>
          <h2 id="web-title">브라우저에서 두는 오목판</h2>
          <p>
            같은 판을 브라우저로 옮겼습니다. {gomokuWeb.modes.join(", ")}을 블로그 글에서 둘 수 있습니다. 판정은 같은 규칙을 TypeScript로 옮기고 정답표로 대조해 검증했습니다.
          </p>
          <div className="tags">
            {gomokuWeb.stack.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <div>
            <a className="btn solid" href={gomokuWeb.link.href} target="_blank" rel="noopener">
              {gomokuWeb.link.label} ↗
            </a>
          </div>
        </div>
      </section>
    </ProjectDetail>
  );
}
