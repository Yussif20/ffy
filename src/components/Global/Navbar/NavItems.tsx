"use client";
import useIsActive from "@/hooks/useIsActive";
import useIsArabic from "@/hooks/useIsArabic";
import useIsFutures from "@/hooks/useIsFutures";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function NavItems() {
  const t = useTranslations("Navbar");
  const isActive = useIsActive();
  const isFutures = useIsFutures();
  const isArabic = useIsArabic();
  const router = useRouter();

  const navItems = [
    {
      name: t("home"),
      href: "/",
      part: 1,
      scrollToTabs: false,
      scrollToTop: true,
    },
    {
      name: t("offers"),
      href: "/exclusive-offers",
      part: 1,
      scrollToTabs: true,
      scrollToTop: false,
    },
    {
      name: t("challenges"),
      href: "/challenges",
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
            part: 3,
            badge: t("comingSoon"),
            scrollToTabs: false,
            scrollToTop: false,
          },
        ]),
  ].map((item) => ({
    ...item,
    href: isFutures
      ? "/futures" + (item.href === "/" ? "" : item.href)
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

  const linkClass = (path: string) => {
    const cleanPath = path.split("#")[0];
    return cn(
      "text-foreground/80 hover:text-foreground transition-colors text-center pb-1 hover:border-b-3 hover:border-primary/20 transition-all text-[13px] duration-100 min-w-30",
      isActive(cleanPath, isFutures ? ["/futures"] : ["/"]) &&
        "border-b-3 border-primary hover:border-primary",
      isArabic && "text-base md:text-lg font-semibold",
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
            onClick={(e) => handleClick(e, item)}
            className={cn(
              linkClass(item.href),
              "flex flex-col items-center gap-0.5",
            )}
          >
            <span>{item.name}</span>
            {item.badge && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}
