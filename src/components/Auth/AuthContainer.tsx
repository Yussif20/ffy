import { ReactNode } from "react";
import SectionTitle from "../Global/SectionTitle";
import { Card, CardContent } from "../ui/card";
import LinearBorder from "../Global/LinearBorder";
import { cn } from "@/lib/utils";

export default function AuthContainer({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <LinearBorder
      className2="rounded-xl max-w-full"
      className="rounded-xl max-w-full!"
    >
      <Card className={cn("w-full max-w-xl p-4 md:p-8 border-none", className)}>
        <CardContent className="space-y-10 w-full">
          <SectionTitle title={title} subtitle={subtitle} />
          <div>{children}</div>
        </CardContent>
      </Card>
    </LinearBorder>
  );
}
