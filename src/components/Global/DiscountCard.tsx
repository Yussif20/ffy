import { Copy, Check } from "lucide-react";
import { useState } from "react";
import DiscountText from "./DiscountText";

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
        // Modern API (works on HTTPS)
        await navigator.clipboard.writeText(discount.code);
      } else {
        // Fallback for HTTP / older browsers
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
    <div
      onClick={handleCopy}
      className="px-2 py-0.5 md:py-1 rounded-xl bg-linear-to-t from-primary1 to-primary2  cursor-pointer select-none"
    >
      <h1 className="font-semibold text-sm sm:text-base md:text-lg text-center leading-none">
        <DiscountText percentage={discount.offerPercentage} />
      </h1>

      {discount.code && (
        <div className="w-full rounded-lg md:rounded-xl bg-background/70 py-1.5 flex justify-center items-center gap-2 text-xs sm:text-sm md:text-base font-medium px-4 md:px-8 ">
          {discount?.code}
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </div>
      )}
    </div>
  );
}
