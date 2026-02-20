"use client";
import useIsActive from "@/hooks/useIsActive";
import useIsArabic from "@/hooks/useIsArabic";
import useIsFutures from "@/hooks/useIsFutures";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Home, Tag, Trophy, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { useId } from "react";

export default function NavItems() {
  const id = useId();
  const t = useTranslations("Navbar");
  const isActive = useIsActive();
  const isFutures = useIsFutures();
  const isArabic = useIsArabic();
  const router = useRouter();

  const navItems = [
    {
      name: t("home"),
      href: "/forex",
      icon: <Home size={13} />,
      part: 1,
      scrollToTabs: false,
      scrollToTop: true,
    },
    {
      name: t("offers"),
      href: "/offers",
      icon: <Tag size={13} />,
      part: 1,
      scrollToTabs: true,
      scrollToTop: false,
    },
    {
      name: t("challenges"),
      href: "/challenges",
      icon: <Trophy size={13} />,
      part: 2,
      scrollToTabs: true,
      scrollToTop: false,
    },
    ...(isFutures
      ? []
      : [
          {
            name: t("spreads"),
            href: "/spreads",
            icon: <BarChart2 size={13} />,
            part: 3,
            badge: t("comingSoon"),
            badgeTooltip: "Spread data across all firms — launching soon",
            scrollToTabs: false,
            scrollToTop: false,
          },
        ]),
  ].map((item) => ({
    ...item,
    href: isFutures
      ? "/futures" + (item.href === "/forex" ? "" : item.href.replace(/^\/forex/, ""))
      : item.href,
  }));

  const waitForElement = (
    id: string,
    callback: (element: HTMLElement) => void,
    maxAttempts = 50,
  ) => {
    let attempts = 0;
    const check = () => {
      const element = document.getElementById(id);
      if (element) {
        callback(element);
      } else if (attempts < maxAttempts) {
        attempts++;
        requestAnimationFrame(check);
      }
    };
    requestAnimationFrame(check);
  };

  const scrollToTabsSection = () => {
    const isAtTop = window.scrollY < 100;
    waitForElement("tabs-section", (tabsSection) => {
      // If user is at the top of the page, navbar is expanded so we need extra offset
      const navbarOffset = isAtTop ? 400 : 200;
      const elementPosition =
        tabsSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarOffset,
        behavior: "smooth",
      });
    });
  };

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleClick = (e: React.MouseEvent, item: (typeof navItems)[0]) => {
    if (item.scrollToTabs) {
      e.preventDefault();
      router.push(item.href, { scroll: false });
      scrollToTabsSection();
    } else if (item.scrollToTop) {
      e.preventDefault();
      router.push(item.href, { scroll: false });
      scrollToTop();
    }
  };

  const linkClass = () => {
    return cn(
      "text-foreground/80 hover:text-foreground transition-colors text-center pb-1 hover:border-b-3 hover:border-primary/20 transition-all text-[13px] duration-100 min-w-30",
      isArabic && "text-base md:text-lg font-semibold",
    );
  };
  return (
    <>
      <div className="relative">
        {/* Left fade hint for mobile horizontal scroll */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-linear-to-r from-background to-transparent z-10 md:hidden" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-linear-to-l from-background to-transparent z-10 md:hidden" />
        <div
          className={cn("w-full flex md:grid", !isFutures && "overflow-x-auto")}
          style={{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }}
        >
          {navItems.map((item) => {
            const isActiveItem = isActive(item.href.split("#")[0], isFutures ? ["/futures"] : ["/forex"]);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item)}
                className={cn(linkClass(), "flex flex-col items-center gap-0.5")}
              >
                <span className="relative flex items-center gap-1">
                  {"icon" in item && item.icon}
                  {item.name}
                  {isActiveItem && (
                    <motion.span
                      layoutId={`nav-underline-${id}`}
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </span>
                {item.badge && (
                  <span
                    title={"badgeTooltip" in item ? item.badgeTooltip : undefined}
                    className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium cursor-help"
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
