import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function LinearBorder({
  children,
  className,
  className2,
}: {
  children: ReactNode;
  className?: string;
  className2?: string;
}) {
  return (
    <div
      className={cn(
        "p-px max-w-max rounded-2xl bg-linear-to-b from-primary/40 to-primary/20 relative shadow-lg shadow-primary/10",
        className
      )}
    >
      <div
        className={cn("bg-card rounded-2xl overflow-hidden", className2)}
      >
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
