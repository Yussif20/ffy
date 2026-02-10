"use client";
import useIsActive from "@/hooks/useIsActive";
import useIsArabic from "@/hooks/useIsArabic";
import useIsFutures from "@/hooks/useIsFutures";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
export default function NavItems() {
  const t = useTranslations("Navbar");
  const isActive = useIsActive();
  const isFutures = useIsFutures();
  const isArabic = useIsArabic();
  const navItems = [
    { name: t("home"), href: "/", part: 1 },
    { name: t("offers"), href: "/exclusive-offers", part: 1 },
    { name: t("challenges"), href: "/challenges", part: 2 },
    { name: t("bestSellers"), href: "/best-sellers", part: 3 },
    ...(isFutures ? [] : [{ name: t("spreads"), href: "/spreads", part: 3 }]),
  ].map((item) => ({
    ...item,
    href: isFutures
      ? "/futures" + (item.href === "/" ? "" : item.href)
      : item.href,
  }));

  const linkClass = (path: string) => {
    return cn(
      "text-foreground/80 hover:text-foreground transition-colors text-center pb-1 hover:border-b-3 hover:border-primary/20 transition-all text-[13px] duration-100 min-w-30",
      isActive(path, isFutures ? ["/futures"] : ["/"]) &&
        "border-b-3 border-primary hover:border-primary",
      isArabic && "text-base md:text-lg font-semibold"
    );
  };
  return (
    <>
      <div
        className={cn("flex md:grid grid-cols-5 w-full overflow-x-auto")}
        style={{
          gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))`,
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(linkClass(item.href))}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
}
