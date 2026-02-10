import SectionTitle from "@/components/Global/SectionTitle";
import SpreadFilter from "./SpreadFilter";
import SpreadTable from "./SpreadTable";
import { getTranslations } from "next-intl/server";

export default async function Spreads() {
  const t = await getTranslations("Spread");

  return (
    <div className="space-y-8">
      <SectionTitle title={t("title")} subtitle={t("subtitle")} />
      <SpreadFilter />
      <SpreadTable />
    </div>
  );
}
