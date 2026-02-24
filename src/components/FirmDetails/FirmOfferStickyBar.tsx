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

export default function FirmOfferStickyBar({ firm }: { firm: SinglePropFirm }) {
  const t = useTranslations("Offers");
  const isFutures = useIsFutures();
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    successMessage: t("codeCopied") ?? "Code copied!",
    errorMessage: t("copyFailed") ?? "Failed to copy",
  });

  const firstOffer = firm?.offers?.[0];
  const hasCode = Boolean(firstOffer?.code);
  const hasPercent = firstOffer?.offerPercentage != null && firstOffer.offerPercentage > 0;
  const hasAffiliate = Boolean(firm?.affiliateLink);

  if (!hasCode && !hasPercent && !hasAffiliate) return null;

  const codeBorderCls = isFutures
    ? "border-yellow-400/70 hover:bg-yellow-400/10"
    : "border-primary/70 hover:bg-primary/10";
  const codeLabelCls = isFutures ? "text-yellow-600 dark:text-yellow-400" : "text-primary";

  const firmHref = isFutures ? `/futures/firms/${firm.slug}` : `/forex/firms/${firm.slug}`;

  return (
    <div className="sticky top-14 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-between gap-2 sm:gap-5 px-2 py-2 sm:px-4 sm:py-2.5 min-h-11 sm:min-h-12">
        {/* Firm logo + name (shrink more on very small screens) */}
        <Link
          href={firmHref}
          className="flex items-center gap-1.5 sm:gap-2 shrink-0 min-w-0 rounded-lg p-1 -m-1 hover:bg-muted/50 transition-colors"
        >
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-md overflow-hidden border border-border bg-card shrink-0 relative">
            <Image
              src={firm.logoUrl || "/placeholder.png"}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <span className="font-semibold text-xs sm:text-base text-foreground truncate max-w-[80px] xs:max-w-[100px] sm:max-w-[180px]">
            {firm.title}
          </span>
        </Link>

        {/* Code (no label), percent, buy */}
        <div className="flex items-center gap-2 sm:gap-5 shrink-0 min-w-0">
          {hasCode && (
            <button
              type="button"
              onClick={() => copyToClipboard(firstOffer!.code)}
              className={cn(
                "inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border-2 border-dashed px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm transition-colors shrink-0",
                codeBorderCls
              )}
            >
              <span className="font-semibold uppercase tracking-wide truncate max-w-[60px] sm:max-w-none">{firstOffer!.code}</span>
              {isCopied ? (
                <Check className="size-4 text-green-500 shrink-0" />
              ) : (
                <Copy className={cn("size-4 shrink-0", isFutures ? "text-yellow-500" : "text-primary")} />
              )}
            </button>
          )}

          {hasPercent && (
            <div className="inline-flex items-center gap-1 sm:gap-1.5 rounded-lg bg-primary/15 px-2 py-1 sm:px-3 sm:py-1.5 border border-primary/30 shrink-0">
              <span className="text-xs sm:text-sm font-bold tabular-nums text-primary">{firstOffer!.offerPercentage}%</span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary/80">OFF</span>
            </div>
          )}

          {hasAffiliate && (
            <NextLink href={firm.affiliateLink} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Button size="sm" className="h-8 sm:h-9 rounded-lg gap-1 sm:gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm px-2 sm:px-3">
                {t("buy")}
                <ArrowUpRight className="size-3 sm:size-4 shrink-0" />
              </Button>
            </NextLink>
          )}
        </div>
      </div>
    </div>
  );
}
