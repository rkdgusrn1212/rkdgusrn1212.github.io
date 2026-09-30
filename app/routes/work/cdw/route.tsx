import type { Route } from "./+types/route";
import { CaseDetail } from "~/components/case-detail";
import { CleansingDemo } from "~/components/cases/cleansing-demo";
import { getCase } from "~/data/cases";
import { seo } from "~/lib/site";

const item = getCase("cdw");

export function meta({}: Route.MetaArgs) {
  return seo({ title: item.title, description: item.summary, path: "/work/cdw" });
}

export default function Case() {
  return <CaseDetail item={item} demo={<CleansingDemo />} />;
}
