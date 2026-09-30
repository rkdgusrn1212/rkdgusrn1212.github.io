import type { Route } from "./+types/route";
import { CaseDetail } from "~/components/case-detail";
import { GrainDemo } from "~/components/cases/grain-demo";
import { getCase } from "~/data/cases";
import { seo } from "~/lib/site";

const item = getCase("stats");

export function meta({}: Route.MetaArgs) {
  return seo({ title: item.title, description: item.summary, path: "/work/stats" });
}

export default function Case() {
  return <CaseDetail item={item} demo={<GrainDemo />} />;
}
