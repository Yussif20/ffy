"use client";

import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
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

function smoothScrollToTarget() {
  waitForElement("tabs-section", (el) => {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  // Fallback: if no tabs-section (e.g. about, faq), smooth scroll to top
  setTimeout(() => {
    const tabs = document.getElementById("tabs-section");
    if (!tabs) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, 500);
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
  const isInternal = href.startsWith("/") || !href.startsWith("http");

  const handleClick = (e: React.MouseEvent) => {
    if (target === "_blank" || !isInternal) return;
    e.preventDefault();
    const path = href || "/";
    router.push(path, { scroll: false });
    setTimeout(smoothScrollToTarget, 150);
  };

  if (target === "_blank") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(className)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href || "/"} className={cn(className)} onClick={handleClick}>
      {children}
    </Link>
  );
}
