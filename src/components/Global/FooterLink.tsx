"use client";

import { Link, useRouter } from "@/i18n/navigation";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

function waitForElement(
  id: string,
  callback: (element: HTMLElement) => void,
  maxAttempts = 50
) {
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
}

function scrollToTabsSection() {
  const isAtTop = window.scrollY < 100;

  waitForElement("tabs-section", (tabsSection) => {
    const navbarOffset = isAtTop ? 400 : 200;
    const elementPosition =
      tabsSection.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementPosition - navbarOffset,
      behavior: "smooth",
    });
  });
}

function getScrollOffset(path: string) {
  // Normalize path (strip leading slash if present)
  const cleanPath = path.replace(/^\//, "");

  // Fine-tuned offsets per destination
  if (cleanPath === "contact") {
    // Scroll a bit further down so the contact form sits nicely in view
    return 140;
  }

  if (cleanPath === "challenges") {
    // Same idea for challenges section/page
    return 140;
  }

  if (!cleanPath) {
    // "All prop firms" link (empty href) – land slightly lower than the very top
    return 200;
  }

  // Default: top of the page
  return 0;
}

export default function FooterLink({
  href,
  children,
  className,
  target,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
}) {
  const router = useRouter();
  const isExternal = href.startsWith("http");

  // External links (social, etc.) open in a new tab without custom scrolling.
  if (target === "_blank" || isExternal) {
    return (
      <a
        href={href}
        target={target || "_blank"}
        rel="noopener noreferrer"
        className={cn(className)}
      >
        {children}
      </a>
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const rawPath = href || "/";
    const targetPath =
      rawPath === "/" ? "/" : rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
    const cleanPath = targetPath.replace(/^\//, "");

    // For tabbed sections (offers/challenges), mimic navbar behavior:
    // navigate, then scroll precisely to #tabs-section with dynamic offset.
    if (cleanPath === "challenges" || cleanPath === "offers") {
      router.push(targetPath, { scroll: false });
      scrollToTabsSection();
      return;
    }

    const offset = getScrollOffset(targetPath);

    // Navigate without automatic scroll, then apply our own offset.
    router.push(targetPath, { scroll: false });

    // Give the new page/layout a short moment to render before scrolling.
    setTimeout(() => {
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }, 200);
  };

  return (
    <Link href={href || "/"} className={cn(className)} onClick={handleClick}>
      {children}
    </Link>
  );
}
