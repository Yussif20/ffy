import SpreadFilter from "./SpreadFilter";
import SpreadTable from "./SpreadTable";
import { getTranslations } from "next-intl/server";

export default async function Spreads() {
  const t = await getTranslations("Spread");

  return (
    <div className="space-y-8">
      <div className="text-center flex justify-center items-center flex-col gap-3">
        <h1 className="font-bold text-4xl lg:text-5xl xl:text-6xl max-w-2xl">
          {t("title")}
        </h1>
        <p className="text-sm md:text-sm text-foreground/80 max-w-3xl">
          {t("subtitle")}
        </p>
      </div>
      
      <SpreadFilter />
      <SpreadTable />
    </div>
  );
}
