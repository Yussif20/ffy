import { cn } from "@/lib/utils";

export default function SectionTitle({
  title,
  subtitle,
  subtitleClass,
  titleClass,
}: {
  title: string;
  subtitle?: string;
  subtitleClass?: string;
  titleClass?: string;
}) {
  return (
    <div className="text-center flex justify-center items-center flex-col gap-3">
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
