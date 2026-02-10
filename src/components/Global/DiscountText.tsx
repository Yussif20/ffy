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
    <div dir="ltr" className={cn("px-4 py-2", mainClassName)}>
      {percentage} % <span className={cn(className)}> {t("offLabel")}</span>
    </div>
  );
}
