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

  const goToPage = (page: number) => {
    createPageURL(page);
  };

  if (totalPages < 2) {
    return "";
  }

  return (
    <div className="flex items-center justify-center">
      <button
        className={`group relative h-10 min-w-8 px-3 flex items-center justify-center border font-medium text-sm transition-all duration-200 ease-out border-primary/40
          ${currentPage === 1 && "cursor-not-allowed opacity-50"}
           ${isArabic ? "rounded-r-full" : "rounded-l-full"}
        `}
        onClick={() => goToPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        {t("previous")}
        <span className="sr-only">{t("previousPage")}</span>
      </button>

      <div className="flex items-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            className={`
                group relative h-10 min-w-8 px-3 flex items-center justify-center 
                 border font-medium text-sm
                transition-all duration-200 ease-out border-primary/40
                ${
                  currentPage === page
                    ? `
                    bg-foreground/10   
                    hover:-translate-y-0.5 active:translate-y-0
                  `
                    : `
                     shadow-sm
                    hover:bg-primary/5  hover:text-primary hover:shadow-md
                    hover:-translate-y-0.5 active:translate-y-0
                  `
                }
              
              `}
            key={`page-${page}`}
            onClick={() => goToPage(page as number)}
          >
            <span className="relative z-10">{page}</span>
            {currentPage === page && (
              <div className="absolute inset-0 bg-primary/20 rounded-lg opacity-20 blur-sm"></div>
            )}
          </button>
        ))}
      </div>

      <button
        className={`
         group  relative h-10 min-w-8 px-3 flex items-center justify-center border font-medium text-sm transition-all duration-200 ease-out border-primary/40
          ${currentPage === totalPages && "cursor-not-allowed opacity-50"}
          ${isArabic ? "rounded-l-full" : "rounded-r-full"}
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
