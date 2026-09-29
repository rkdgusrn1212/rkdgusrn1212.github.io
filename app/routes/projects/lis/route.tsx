import type { Route } from "./+types/route";
import { ProjectDetail } from "~/components/project-detail";
import { getProject } from "~/data/projects";
import { seo } from "~/lib/site";

const project = getProject("lis");

export function meta({}: Route.MetaArgs) {
  return seo({
    title: project.title,
    description: "환자 접수부터 검사 결과 입력까지 병원 진단검사 업무를 관리하는 웹 시스템. 팀장으로 기획·설계와 개발을 이끌었다.",
    path: "/projects/lis",
  });
}

export default function Lis() {
  return <ProjectDetail project={project} demo={<span className="caption">환자 접수 흐름 체험 자리 (P2)</span>} />;
}
