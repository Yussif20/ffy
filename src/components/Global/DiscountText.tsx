"use client";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function DiscountText({
  percentage,
  className,
  mainClassName,
}: {
  percentage: number;
  className?: string;
  mainClassName?: string;
}) {
  const t = useTranslations("Features");
  return (
    <div
      dir="ltr"
      className={cn(
        "inline-flex flex-wrap items-baseline justify-center gap-x-2 gap-y-0 px-4 py-2 min-w-0",
        mainClassName
      )}
    >
      <span className="whitespace-nowrap shrink-0">{percentage} %</span>
      <span className={cn("whitespace-nowrap shrink-0", className)}>
        {t("offLabel")}
      </span>
    </div>
  );
}
