import { Button } from "@/components/ui/button";
import { countryData, countryDataByCountry } from "@/data";
import { SinglePropFirm } from "@/types/firm.types";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { getTranslations } from "next-intl/server";
import NextLink from "next/link";
import { Link } from "@/i18n/navigation";
import { calculateYearsInOperation } from "@/utils/calculateYearsInOperation";
export default async function FirmHeader({
  company,
}: {
  company: SinglePropFirm;
}) {
  const t = await getTranslations("FirmHeader");
  const backHref = company.firmType === "FUTURES" ? "/futures" : "/forex";

  const country =
    countryDataByCountry(company.country) || countryData(company.country);
  return (
    <div className="space-y-8">
      {/* Top Row */}
      <div className="flex items-center gap-2">
        <Link href={backHref}>
          <Button variant="outline2" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
          </Button>
        </Link>

        <Button
          variant="outline"
          size="default"
          className="rounded-full flex items-center gap-2"
          linearClassName="w-max"
        >
          <div className="w-5 h-5 aspect-square cursor-pointer border border-primary/60 bg-primary relative overflow-hidden rounded-full">
            <Image
              src={company?.logoUrl || "/placeholder.png"}
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          {company?.title}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        {/* Left Section */}
        <div className="flex items-start flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Company Avatar */}
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 border-foreground/60  rounded-lg relative overflow-hidden">
              <Image
                src={company?.logoUrl || "/placeholder.png"}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold block sm:hidden">
              {company?.title}
            </h1>
          </div>

          {/* Company Info */}
          <div className="flex flex-col gap-3">
            <NextLink href={company?.affiliateLink || "#"} target="_blank">
              <h1 className="text-2xl sm:text-3xl font-bold hidden sm:flex  items-center gap-2 hover:underline">
                {company?.title} <ArrowUpRight size={24} />
              </h1>
            </NextLink>

            {/* Details */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              {/* CEO */}
              <div className="flex flex-col">
                <span className="text-muted-foreground font-semibold">
                  {t("labels.ceo")}
                </span>
                <span className="font-medium">{company?.ceo}</span>
              </div>

              <div className="hidden sm:block h-8 w-px bg-border" />

              {/* Country */}
              <div className="flex flex-col">
                <span className="text-muted-foreground font-semibold">
                  {t("labels.country")}
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-5 h-3.5 relative">
                    {country?.flag && (
                      <Image
                        src={country?.flag || ""}
                        alt="flag"
                        fill
                        className="object-cover rounded-sm"
                      />
                    )}
                  </div>
                  <span className="font-medium">{country?.code}</span>
                </div>
              </div>

              <div className="hidden sm:block h-8 w-px bg-border" />

              {/* Date Created */}
              <div className="flex flex-col">
                <span className="text-muted-foreground font-semibold">
                  {t("labels.dateCreated")}
                </span>
                <span className="font-medium">
                  {new Date(company?.dateEstablished).toLocaleDateString()}
                </span>
              </div>

              <div className="hidden sm:block h-8 w-px bg-border" />

              {/* Years in Operation */}
              <div className="flex flex-col">
                <span className="text-muted-foreground font-semibold">
                  {t("labels.yearsInOperation")}
                </span>
                <span className="font-medium">
                  {calculateYearsInOperation(company?.dateEstablished)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Button */}
        <NextLink href={company?.affiliateLink || "#"} target="_blank">
          <Button size="xl" className="px-8 gap-2">
            {t("buyButton")}
            <ArrowUpRight size={20} />
          </Button>
        </NextLink>
      </div>
    </div>
  );
}

export function FirmHeaderSkeleton() {
  return (
    <div className="space-y-8">
      {/* Top Row */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-40 rounded-full" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        {/* Left */}
        <div className="flex items-start flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Company Avatar */}
          <div className="flex gap-2 items-center">
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-8 w-40 sm:hidden" />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3">
            <Skeleton className="h-8 w-48 hidden sm:block" />

            <div className="flex flex-wrap items-center gap-6 text-sm">
              {/* CEO */}
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>

              <div className="hidden sm:block h-8 w-px bg-border" />

              {/* Country */}
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-20" />
                <div className="flex items-center gap-1">
                  <Skeleton className="h-3.5 w-5 rounded-sm" />
                  <Skeleton className="h-4 w-10" />
                </div>
              </div>

              <div className="hidden sm:block h-8 w-px bg-border" />

              {/* Date Created */}
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
              </div>

              <div className="hidden sm:block h-8 w-px bg-border" />

              {/* Years in Operation */}
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Button */}
        <Skeleton className="h-12 w-40 rounded-md" />
      </div>
    </div>
  );
}
