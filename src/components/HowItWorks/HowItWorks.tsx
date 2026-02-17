import SectionTitle from "../Global/SectionTitle";
import { getTranslations } from "next-intl/server";
import HowItWorksStepsClient from "./HowItWorksStepsClient";

export default async function HowItWorks() {
  const t = await getTranslations("HowItWorks");
  const steps = [
    { number: "01", text: t("steps.step1") },
    { number: "02", text: t("steps.step2") },
    { number: "03", text: t("steps.step3") },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-10 md:pb-14">
      <SectionTitle title={t("title")} subtitle={t("subtitle")} />
      <HowItWorksStepsClient steps={steps} />
    </div>
  );
}
