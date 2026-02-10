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
        `p-px pb-px max-w-max rounded-full bg-linear-to-t from-primary1 to-primary2 relative`,
        className
      )}
    >
      <div
        className={cn("bg-background rounded-full overflow-hidden", className2)}
      >
        <div className="bg-primary/10 rounded-xl w-full">{children}</div>
      </div>
    </div>
  );
}
