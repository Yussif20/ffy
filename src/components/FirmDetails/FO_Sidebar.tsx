"use client";
import useIsArabic from "@/hooks/useIsArabic";
import useIsFutures from "@/hooks/useIsFutures";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function FO_Sidebar() {
  const t = useTranslations("FOSidebar");
  const isFutures = useIsFutures();
  const isArabic = useIsArabic();
  const sidebarItems = [
    { label: t("items.firmOverview"), value: "firm-overview" },
    { label: t("items.leverage"), value: "leverage" },
    { label: t("items.commissions"), value: "commissions" },
    { label: t("items.accountSizes"), value: "account-sizes" },
    { label: t("items.maxAllocation"), value: "max-allocation" },
    { label: t("items.dailyMaximumLoss"), value: "daily-maximum-loss" },
    { label: t("items.drawdown"), value: "drawdown" },
    ...(!isFutures
      ? [{ label: t("items.riskManagement"), value: "risk-management" }]
      : []), //hide on futures
    { label: t("items.consistencyRules"), value: "consistency-rules" },
    ...(!isFutures
      ? [
          {
            label: t("items.minimumTradingDays"),
            value: "minimum-trading-days",
          },
        ]
      : []), //hide on futures
    { label: t("items.newsTrading"), value: "news-trading" },
    {
      label: t("items.overnightWeekendsHolding"),
      value: "overnight-weekends-holding",
    },
    { label: t("items.copyTrading"), value: "copy-trading" },
    { label: t("items.experts"), value: "experts" },
    { label: t("items.vpnVps"), value: "vpn-vps" },
    ...(!isFutures
      ? [{ label: t("items.profitShare"), value: "profit-share" }]
      : []), //hide on futures
    { label: t("items.payoutPolicy"), value: "payout-policy" },
    ...(!isFutures
      ? [{ label: t("items.scaleUpPlan"), value: "scale-up-plan" }]
      : []), //hide on futures
    { label: t("items.inactivityRules"), value: "inactivity-rules" },
    { label: t("items.prohibitedStrategies"), value: "prohibited-strategies" },
    { label: t("items.restrictedCountries"), value: "restricted-countries" },
  ];

  const [activeId, setActiveId] = useState(sidebarItems[0].value);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      const triggerPoint = 300;
      let currentSection = sidebarItems[0]?.value;

      for (let item of sidebarItems) {
        const section = document.getElementById(item.value);
        if (section) {
          const sectionTop = section.getBoundingClientRect().top;

          if (sectionTop <= triggerPoint) {
            currentSection = item.value;
          }
        }
      }
      setActiveId(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sidebarItems]);
  return (
    <aside className="w-full lg:w-64 space-y-1 flex flex-row lg:flex-col overflow-auto">
      {sidebarItems.map((item, index) => (
        <a
          key={index}
          href={`#${item.value}`}
          className={cn(
            "w-full block font-medium text-[13px] text-left px-4 py-2 lg:py-1 lg:rounded-sm transition-all duration-200 hover:bg-accent text-muted-foreground min-w-max text-start ",
            activeId === item.value &&
              "border-b-2 lg:border-b-0 lg:bg-primary/20 lg:border-l-4 border-primary hover:bg-primary/20 text-foreground py-2! font-bold",
            isArabic && "font-semibold"
          )}
        >
          {item.label}
        </a>
      ))}
    </aside>
  );
}
