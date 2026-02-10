import LinearBorder from "../Global/LinearBorder";
import SectionTitle from "../Global/SectionTitle";
import BatIcon from "../Global/Icons/BatIcon";
import { getTranslations } from "next-intl/server";
import HowItWorksLine from "./HowItWorksLine";

export default async function HowItWorks() {
  const t = await getTranslations("HowItWorks");
  const steps = [
    {
      number: "01",
      text: t("steps.step1"),
    },
    {
      number: "02",
      text: t("steps.step2"),
    },
    {
      number: "03",
      text: t("steps.step3"),
    },
    {
      number: "04",
      text: t("steps.step4"),
    },
    {
      number: "05",
      text: t("steps.step5"),
    },
    {
      number: "06",
      text: t("steps.step6"),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20 md:pb-30">
      <SectionTitle title={t("title")} subtitle={t("subtitle")} />

      <div className="relative">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="relative flex gap-3 pb-5 items-center"
          >
            <HowItWorksLine isShow={index < steps.length - 1} />

            <LinearBorder className="max-h-max">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background">
                <p className="text-sm font-semibold">{step.number}</p>
              </div>
            </LinearBorder>
            <div className="flex gap-2 items-center">
              <BatIcon />
              <div className="flex-1 ">
                <div className="flex items-center gap-1 ">
                  <p className="text-sm md:text-base leading-relaxed font-semibold">
                    {step.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
