import { Copy, Check } from "lucide-react";
import { useState } from "react";

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

  const handleCopy = async () => {
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
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

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
}
