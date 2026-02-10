"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import useIsFutures from "@/hooks/useIsFutures";
import useIsActive from "@/hooks/useIsActive";
import useIsArabic from "@/hooks/useIsArabic";
import { cn } from "@/lib/utils";

export default function HomeNavItems() {
  const t = useTranslations("Navbar");
  const isFutures = useIsFutures();
  const isArabic = useIsArabic();
  const comingPathname = usePathname();
  const pathName = `/${comingPathname.split("/").slice(2).join("/")}`;
  const checkActive = useIsActive();
  let pages: { name: string; value: string }[] = [
    { name: t("firms"), value: "/" },
    { name: t("offers"), value: "/exclusive-offers" },
    { name: t("challenges"), value: "/challenges" },
  ];

  // ---- APPLY FUTURES PREFIX EXACT LIKE NavItems ----
  pages = pages.map((item) => ({
    ...item,
    value: isFutures
      ? "/futures" + (item.value === "/" ? "" : item.value)
      : item.value,
  }));

  // ----- MATCH CHECK WITH FUTURES ----
  const isNotMatchPathName =
    pathName === (isFutures ? "/futures" : "/")
      ? false
      : !pathName.startsWith(
          isFutures ? "/futures/exclusive-offers" : "/exclusive-offers"
        ) &&
        !pathName.startsWith(isFutures ? "/futures/challenges" : "/challenges");

  if (isNotMatchPathName) return "";

  return (
    <div className="space-y-10 pb-20 md:pb-30">
      <div className="flex justify-center items-center gap-4">
        {pages.map((item) => {
          const isActive = checkActive(
            item.value,
            isFutures ? ["/futures"] : ["/"]
          );
          return (
            <Link key={item.value} href={item.value}>
              <Button
                size={"xl"}
                variant={isActive ? "default" : "outline"}
                className={cn(isArabic && "text-lg font-semibold")}
              >
                {item.name}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
