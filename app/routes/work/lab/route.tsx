import type { Route } from "./+types/route";
import { CaseDetail } from "~/components/case-detail";
import { ResultDemo } from "~/components/cases/result-demo";
import { getCase } from "~/data/cases";
import { seo } from "~/lib/site";

const item = getCase("lab");

export function meta({}: Route.MetaArgs) {
  return seo({ title: item.title, description: item.summary, path: "/work/lab" });
}

export default function Case() {
  return <CaseDetail item={item} demo={<ResultDemo />} />;
}
