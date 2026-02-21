"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

/*
  ORIGINAL DISCOUNT CARD — Green/primary background (restore if client asks for it back)
  ————————————————————————————————————————————————————————————————————————————————
  return (
    <div className="flex justify-center items-center">
      <div
        onClick={handleCopy}
        className="inline-flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-lg
          bg-gradient-to-b from-primary/90 to-primary/60
          border border-primary/40 shadow-sm shadow-primary/20
          cursor-pointer select-none
          hover:shadow-md hover:shadow-primary/30 hover:scale-105
          transition-all duration-200"
      >
        <span className="text-[11px] font-bold text-primary-foreground tracking-wider leading-none uppercase">
          {discount.offerPercentage}% OFF
        </span>
        {discount.code && (
          <div className="flex items-center gap-1 bg-background/85 rounded-md px-2 py-0.5">
            <span className="text-[10px] font-semibold tracking-wide">{discount.code}</span>
            {copied
              ? <Check size={9} className="text-primary shrink-0" />
              : <Copy size={9} className="text-foreground/50 shrink-0" />
            }
          </div>
        )}
      </div>
    </div>
  );
*/

export default function DiscountCard({
  discount,
}: {
  discount: {
    code: string;
    description: string;
    offerPercentage: number;
  };
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!discount.code) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(discount.code);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = discount.code;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        type="button"
        onClick={handleCopy}
        disabled={!discount.code}
        title={discount.code ? (copied ? "Copied!" : "Tap to copy code") : undefined}
        className="
          group/card relative flex items-stretch min-w-[7.5rem] overflow-hidden
          rounded-xl
          border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/15 via-card/80 to-primary/10
          shadow-md shadow-primary/10
          cursor-pointer select-none
          touch-manipulation
          min-h-[3.25rem]
          transition-all duration-200 ease-out
          hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.03] hover:-translate-y-0.5
          active:scale-[0.98] active:translate-y-0 active:shadow
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background
          disabled:cursor-not-allowed disabled:opacity-70
        "
      >
        {/* Left accent — stronger and slightly wider */}
        <div
          className="w-1.5 shrink-0 bg-primary"
          aria-hidden
        />

        <div className="flex flex-1 flex-col justify-center gap-2 py-3 pl-3 pr-3">
          {/* Percentage — hero number */}
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-primary tabular-nums leading-none">
              {discount.offerPercentage}
            </span>
            <span className="text-[10px] font-semibold text-primary/80 tracking-widest uppercase">
              % off
            </span>
          </div>

          {/* Code — dashed pill like offers */}
          {discount.code && (
            <div
              className="
                flex items-center justify-center gap-2
                border-2 border-dashed border-primary/60 rounded-full
                px-2.5 py-1.5
                bg-primary/5
                group-hover/card:border-primary/80 group-hover/card:bg-primary/10
                transition-colors
              "
            >
              <span
                className={copied
                  ? "text-[11px] font-semibold tracking-widest tabular-nums text-primary uppercase"
                  : "text-[11px] font-semibold tracking-widest tabular-nums text-foreground/90 uppercase"
                }
              >
                {copied ? "Copied!" : discount.code}
              </span>
              <span
                className={copied
                  ? "text-primary"
                  : "text-muted-foreground group-hover/card:text-primary transition-colors"
                }
                aria-hidden
              >
                {copied ? (
                  <Check size={14} strokeWidth={2.5} className="shrink-0" />
                ) : (
                  <Copy size={14} strokeWidth={2} className="shrink-0" />
                )}
              </span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
