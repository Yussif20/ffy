"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { handleSetSearchParams } from "@/lib/utils";
import { useTranslations } from "next-intl";
import useIsArabic from "@/hooks/useIsArabic";

interface PaginationWithParamsProps {
  totalPages: number;
}

export function Pagination({ totalPages }: PaginationWithParamsProps) {
  const isArabic = useIsArabic();
  const t = useTranslations("Pagination");
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);

  const createPageURL = (pageNumber: number | string) => {
    handleSetSearchParams(
      { page: pageNumber.toString() },
      searchParams,
      router
    );
  };

  const scrollToSectionStart = () => {
    const el = document.getElementById("tabs-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPage = (page: number) => {
    createPageURL(page);
    scrollToSectionStart();
  };

  if (totalPages < 2) {
    return "";
  }

  // Always show a window of 10 pages: 4 before current + current + 5 after.
  // Clamp so the window never goes below page 1 or above totalPages.
  const WINDOW = 10;
  const BEFORE = 4;
  let windowStart = Math.max(1, currentPage - BEFORE);
  let windowEnd = windowStart + WINDOW - 1;
  if (windowEnd > totalPages) {
    windowEnd = totalPages;
    windowStart = Math.max(1, windowEnd - WINDOW + 1);
  }
  const visiblePages = Array.from(
    { length: windowEnd - windowStart + 1 },
    (_, i) => windowStart + i
  );

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        className={`
          h-11 px-5 flex items-center justify-center
          border border-primary/30 font-bold text-base
          transition-all duration-200 ease-out
          hover:bg-primary/10 hover:text-primary hover:border-primary/60
          ${currentPage === 1 ? "cursor-not-allowed opacity-40" : "hover:-translate-y-0.5 active:translate-y-0"}
          ${isArabic ? "rounded-r-2xl" : "rounded-l-2xl"}
        `}
        onClick={() => goToPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        {t("previous")}
        <span className="sr-only">{t("previousPage")}</span>
      </button>

      <div className="flex items-center gap-1">
        {visiblePages.map((page) => (
          <button
            className={`
              relative h-11 min-w-11 px-3 flex items-center justify-center rounded-xl
              border font-bold text-base transition-all duration-200 ease-out
              ${
                currentPage === page
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30 scale-105"
                  : "border-primary/30 hover:bg-primary/10 hover:text-primary hover:border-primary/50 hover:-translate-y-0.5 active:translate-y-0"
              }
            `}
            key={`page-${page}`}
            onClick={() => goToPage(page)}
          >
            <span className="relative z-10">{page}</span>
          </button>
        ))}
      </div>

      <button
        className={`
          h-11 px-5 flex items-center justify-center
          border border-primary/30 font-bold text-base
          transition-all duration-200 ease-out
          hover:bg-primary/10 hover:text-primary hover:border-primary/60
          ${currentPage === totalPages ? "cursor-not-allowed opacity-40" : "hover:-translate-y-0.5 active:translate-y-0"}
          ${isArabic ? "rounded-l-2xl" : "rounded-r-2xl"}
        `}
        onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        {t("next")}
        <span className="sr-only">{t("nextPage")}</span>
      </button>
    </div>
  );
}
