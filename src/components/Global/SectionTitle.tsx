import { cn } from "@/lib/utils";

export default function SectionTitle({
  title,
  subtitle,
  subtitleClass,
  titleClass,
  className,
}: {
  title: string;
  subtitle?: string;
  subtitleClass?: string;
  titleClass?: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center flex justify-center items-center flex-col gap-3", className)}>
      <h1 className={cn("font-bold text-3xl lg:text-4xl xl:text-5xl max-w-2xl", titleClass)}>
        {title}
      </h1>
      {subtitle && (
        <p
          className={cn(
            "text-sm md:text-sm text-foreground/80 max-w-3xl",
            subtitleClass
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
