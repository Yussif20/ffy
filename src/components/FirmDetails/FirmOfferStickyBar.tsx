"use client";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import useIsFutures from "@/hooks/useIsFutures";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { SinglePropFirm } from "@/types/firm.types";
import { Check, Copy, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";

const MD_BREAKPOINT = 768;

export default function FirmOfferStickyBar({ firm }: { firm: SinglePropFirm }) {
  const t = useTranslations("Offers");
  const isFutures = useIsFutures();
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    successMessage: t("codeCopied") ?? "Code copied!",
    errorMessage: t("copyFailed") ?? "Failed to copy",
  });

  const firstOffer = firm?.offers?.[0];
  const hasCode = Boolean(firstOffer?.code);
  const hasPercent = firstOffer?.offerPercentage != null && firstOffer.offerPercentage > 0;
  const hasAffiliate = Boolean(firm?.affiliateLink);

  useEffect(() => {
    const check = () => setIsSmallScreen(typeof window !== "undefined" && window.innerWidth < MD_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isSmallScreen) return null;
  if (!hasCode && !hasPercent && !hasAffiliate) return null;

  const codeBorderCls = isFutures
    ? "border-yellow-400/70 hover:bg-yellow-400/10"
    : "border-primary/70 hover:bg-primary/10";

  const firmHref = isFutures ? `/futures/firms/${firm.slug}` : `/firms/${firm.slug}`;

  return (
    <div className="sticky top-(--navbar-height,3.5rem) z-10 w-full border-b border-border bg-background/95 backdrop-blur-sm shadow-sm md:hidden">
      <div className="flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3">
        {/* Logo — spans both rows */}
        <Link href={firmHref} className="shrink-0 self-center rounded-md hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md overflow-hidden border border-border bg-card relative">
            <Image
              src={firm.logoUrl || "/placeholder.png"}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </Link>

        {/* Row 1: Name, Row 2: Code + Percent */}
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          <Link href={firmHref} className="min-w-0 hover:underline">
            <span className="font-semibold text-sm sm:text-base text-foreground line-clamp-1">
              {firm.title}
            </span>
          </Link>

          <div className="flex items-center gap-2 flex-wrap">
            {hasCode && (
              <button
                type="button"
                onClick={() => copyToClipboard(firstOffer!.code)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border-2 border-dashed px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm transition-colors",
                  codeBorderCls
                )}
              >
                <span className="font-semibold uppercase tracking-wide">{firstOffer!.code}</span>
                {isCopied ? (
                  <Check className="size-3.5 sm:size-4 text-green-500 shrink-0" />
                ) : (
                  <Copy className={cn("size-3.5 sm:size-4 shrink-0", isFutures ? "text-yellow-500" : "text-primary")} />
                )}
              </button>
            )}

            {hasPercent && (
              <div className="inline-flex items-center gap-1 rounded-lg bg-primary/15 px-2.5 py-1 sm:px-3 sm:py-1.5 border border-primary/30">
                <span className="text-xs sm:text-sm font-bold tabular-nums text-primary">{firstOffer!.offerPercentage}%</span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary/80">OFF</span>
              </div>
            )}
          </div>
        </div>

        {/* Buy button — centered vertically */}
        {hasAffiliate && (
          <NextLink href={firm.affiliateLink} target="_blank" rel="noopener noreferrer" className="shrink-0 self-center">
            <Button size="sm" className="h-9 sm:h-10 rounded-lg gap-1.5 sm:gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm sm:text-base px-4 sm:px-5">
              {t("buy")}
              <ArrowUpRight className="size-4 sm:size-5 shrink-0" />
            </Button>
          </NextLink>
        )}
      </div>
    </div>
  );
}
