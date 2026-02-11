export const revalidate = 5;
import SectionTitle from "../Global/SectionTitle";

import LinearBorder from "../Global/LinearBorder";
import { FAQ } from "@/types";
import { AddFaq } from "./FAQForms";
import { getTranslations } from "next-intl/server";
import { serverApi } from "@/lib/serverAxios";
import FAQAccordion from "./FAQAccordion";

export default async function FAQComponent({ locale }: { locale?: string }) {
  const isArabic = locale === "ar";
  const t = await getTranslations("FAQ");
  const { data } = await serverApi.get<{ data: FAQ[] }>(`/faqs`);
  const allFaqData = data?.data || [];

  return (
    <div className="space-y-6 md:space-y-12 overflow-x-hidden">
      <div>
        <div className="flex items-center w-full justify-center">
          <SectionTitle
            title={t("title")}
            subtitle={t("subtitle")}
            subtitleClass="max-w-xl"
          />
        </div>
      </div>
      <div className="flex items-center w-full justify-end max-w-5xl mx-auto px-4">
        <AddFaq />
      </div>
      <LinearBorder
        className="rounded-xl w-full max-w-5xl mx-auto overflow-hidden px-4"
        className2="rounded-xl relative overflow-hidden"
      >
        <div className="p-4 md:p-5 bg-background relative rounded-xl overflow-hidden">
          <div className="absolute w-50 aspect-square bg-primary/40 blur-[80px] -left-10 -top-30 hidden md:block"></div>

          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 relative">
            {t("commonQuestions")}
          </h2>

          {allFaqData.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No FAQs available
            </div>
          ) : (
            <FAQAccordion faqData={allFaqData} isArabic={isArabic} />
          )}
        </div>
      </LinearBorder>
    </div>
  );
}
