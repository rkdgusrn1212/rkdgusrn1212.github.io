import type { Route } from "./+types/route";
import { ProjectDetail } from "~/components/project-detail";
import { getProject } from "~/data/projects";
import { seo } from "~/lib/site";

const project = getProject("sanghai-twist");

export function meta({}: Route.MetaArgs) {
  return seo({
    title: project.title,
    description: "쇼핑몰의 상의와 하의를 한눈에 맞춰보는 쇼핑 앱. 4인 팀 팀장으로 10일 만에 완성했다.",
    path: "/projects/sanghai-twist",
  });
}

export default function SanghaiTwist() {
  return <ProjectDetail project={project} demo={<span className="caption">상·하의 맞추기 체험 자리 (P2)</span>} />;
}
