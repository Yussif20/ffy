"use client";
import { Button } from "../ui/button";
import useIsActive from "@/hooks/useIsActive";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import useIsFutures from "@/hooks/useIsFutures";

export default function FDTabs({
  slug,
  count,
}: {
  slug: string;
  count: { offers: number; challenges: number; announcements: number };
}) {
  const t = useTranslations("FDTabs");
  const isActive = useIsActive();
  const isFutures = useIsFutures();
  const tabs = [
    {
      name: <div>{t("tabs.overview")}</div>,
      value: "overview",
    },
    {
      name: (
        <div>
          {t("tabs.challenges")}{" "}
          {count.challenges > 0 && <>({count.challenges})</>}
        </div>
      ),
      value: "challenges",
    },

    {
      name: (
        <div>
          {t("tabs.offers")} {count.offers > 0 && <>({count.offers})</>}
        </div>
      ),
      value: "exclusive-offers",
    },

    // {
    //   name: (
    //     <div>
    //       {t("tabs.announcements")}{" "}
    //       {count.announcements > 0 && <>({count.announcements})</>}
    //     </div>
    //   ),
    //   value: "announcements",
    // },
  ].map((item) => {
    const newLink =
      (isFutures ? "/futures/" : "/forex/") +
      "firms/" +
      slug +
      (item.value !== "overview" ? "/" + item.value : "");
    return {
      ...item,
      value: newLink,
    };
  });

  return (
    <div className="flex flex-wrap sm:justify-center items-center gap-3 sm:gap-5 w-full overflow-auto">
      {tabs.map((item, index) => (
        <Link key={index} href={item.value}>
          <Button
            size="2xl"
            variant={
              isActive(item.value, [tabs[0].value]) ? "defaultBH" : "outline2"
            }
            className="rounded font-semibold"
          >
            {item.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
