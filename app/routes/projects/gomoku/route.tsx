import type { Route } from "./+types/route";
import { ProjectDetail } from "~/components/project-detail";
import { getProject, gomokuWeb } from "~/data/projects";
import { seo } from "~/lib/site";

const project = getProject("gomoku");

// 문구는 개발 사례 중심으로 쓴다. 플레이어가 검색하는 표현은 블로그 글의 몫이다.
export function meta({}: Route.MetaArgs) {
  return seo({
    title: project.title,
    description: "8년째 운영 중인 Android 오목 게임. 인공지능·한 화면 2인·블루투스·온라인 대전, 누적 다운로드 10만+.",
    path: "/projects/gomoku",
  });
}

export default function Gomoku() {
  return (
    <ProjectDetail project={project} demo={<span className="caption">대전 모드 체험 자리 (P2)</span>}>
      <section className="section" id="web">
        <h2>웹 체험판 · {gomokuWeb.released}</h2>
        <p>같은 판을 브라우저로 옮겼다. {gomokuWeb.modes.join(", ")}을 블로그에서 둘 수 있다.</p>
        <div>
          <a className="btn accent" href={gomokuWeb.link.href} target="_blank" rel="noopener">
            {gomokuWeb.link.label} ↗
          </a>
        </div>
      </section>
    </ProjectDetail>
  );
}
