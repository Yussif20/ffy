"use client";
import { TableCell } from "@/components/ui/table";
import useIsArabic from "@/hooks/useIsArabic";
import useIsFutures from "@/hooks/useIsFutures";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

export default function FirmCell({
  company,
}: {
  company: { slug: string; image: string | StaticImageData; name: string };
}) {
  const isArabic = useIsArabic();
  const isFutures = useIsFutures();

  const linkHref = `${isFutures ? "/futures/" : "/"}firms/${company.slug}`;

  return (
    <>
      <TableCell
        className={cn(
          " left-0 bg-background z-10 hidden md:table-cell sticky shadow-[2px_0_4px_rgba(0,0,0,0.1)]",
          isArabic && "right-0 shadow-[-2px_0_4px_rgba(0,0,0,0.1)]"
        )}
      >
        <Link
          href={`${isFutures ? "/futures/" : "/"}firms/${company.slug}`}
          className="flex items-center gap-2"
        >
          <div className="bg-primary3 max-w-max rounded-lg overflow-hidden border border-border flex-shrink-0">
            <div className="w-10 xl:w-14 aspect-square relative">
              <Image
                src={company.image}
                alt="image"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="overflow-hidden transition-all duration-200 md:!max-w-none">
            <h2 className="text-sm md:text-base xl:text-lg font-semibold whitespace-nowrap">
              {company.name}
            </h2>
          </div>
        </Link>
      </TableCell>

      <TableCell
        className={cn(
          "bg-background z-10 table-cell md:hidden sticky left-0 shadow-[2px_0_4px_rgba(0,0,0,0.1)]",
          isArabic && "right-0 shadow-[-2px_0_4px_rgba(0,0,0,0.1)]"
        )}
      >
        <Link href={linkHref} className="flex justify-center md:justify-start">
          <div className="bg-primary3 rounded-lg overflow-hidden border border-border flex-shrink-0 w-10 xl:w-14 aspect-square relative">
            <Image
              src={company.image}
              alt={company.name}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      </TableCell>

      <TableCell className={cn("bg-background z-10 table-cell md:hidden")}>
        <Link href={linkHref} className="flex justify-center md:justify-start">
          <div className="overflow-hidden transition-all duration-200 md:!max-w-none text-center md:text-left">
            <h2 className="text-sm md:text-base xl:text-lg font-semibold whitespace-nowrap">
              {company.name}
            </h2>
          </div>
        </Link>
      </TableCell>
    </>
  );
}
