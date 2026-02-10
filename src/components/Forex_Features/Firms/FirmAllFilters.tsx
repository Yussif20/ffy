"use client";

import CustomSlider from "@/components/Global/CustomSlider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useGetAllPaymentMethodQuery } from "@/redux/api/paymentMethodApi";
import { useGetPlatformsQuery } from "@/redux/api/spreadApi";
import { PaymentMethod } from "@/types/payment-method";
import { Platform_T } from "@/types/spread.types";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const handleSetSearchParams = (
  params: Record<string, string>,
  searchParams: URLSearchParams,
  router: ReturnType<typeof useRouter>,
) => {
  const newParams = new URLSearchParams(searchParams.toString());

  Object.entries(params).forEach(([key, value]) => {
    if (
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.set(key, JSON.stringify(value));
    } else {
      newParams.set(key, String(value));
    }
  });

  router.push(`?${newParams.toString()}`, { scroll: false });
};

export default function FirmAllFilters() {
  const t = useTranslations("Filters");
  const [isMobile, setIsMobile] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterOpen = searchParams.get("filterOpen") === "true" ? true : false;
  const { data: dataRaw } = useGetAllPaymentMethodQuery([
    {
      name: "limit",
      value: "100",
    },
  ]);

  const { data: dataRawPlatforms } = useGetPlatformsQuery([
    {
      name: "limit",
      value: "100",
    },
  ]);

  const paymentMethods = dataRaw?.data || [];

  const platforms = dataRawPlatforms?.data?.platforms || [];

  const countryList = [
    { name: t("afghanistan"), value: "Afghanistan" },
    { name: t("algeria"), value: "Algeria" },
    { name: t("argentina"), value: "Argentina" },
    { name: t("australia"), value: "Australia" },
    { name: t("brazil"), value: "Brazil" },
    { name: t("canada"), value: "Canada" },
    { name: t("chad"), value: "Chad" },
    { name: t("china"), value: "China" },
    { name: t("france"), value: "France" },
    { name: t("germany"), value: "Germany" },
    { name: t("ghana"), value: "Ghana" },
    { name: t("hongKong"), value: "Hong Kong" },
    { name: t("india"), value: "India" },
    { name: t("indonesia"), value: "Indonesia" },
    { name: t("iran"), value: "Iran" },
    { name: t("iraq"), value: "Iraq" },
    { name: t("italy"), value: "Italy" },
    { name: t("kenya"), value: "Kenya" },
    { name: t("lebanon"), value: "Lebanon" },
    { name: t("libya"), value: "Libya" },
    { name: t("malaysia"), value: "Malaysia" },
    { name: t("morocco"), value: "Morocco" },
    { name: t("netherlands"), value: "Netherlands" },
    { name: t("nigeria"), value: "Nigeria" },
    { name: t("pakistan"), value: "Pakistan" },
    { name: t("philippines"), value: "Philippines" },
    { name: t("poland"), value: "Poland" },
    { name: t("russia"), value: "Russia" },
    { name: t("singapore"), value: "Singapore" },
    { name: t("southAfrica"), value: "South Africa" },
    { name: t("southSudan"), value: "South Sudan" },
    { name: t("spain"), value: "Spain" },
    { name: t("sudan"), value: "Sudan" },
    { name: t("syria"), value: "Syria" },
    { name: t("thailand"), value: "Thailand" },
    { name: t("turkey"), value: "Turkey" },
    { name: t("tunisia"), value: "Tunisia" },
    { name: t("ukraine"), value: "Ukraine" },
    { name: t("uae"), value: "UAE" },
    { name: t("uk"), value: "UK" },
    { name: t("us"), value: "USA" },
    { name: t("vietnam"), value: "Vietnam" },
    { name: t("yemen"), value: "Yemen" },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1040);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getYearsInOperation = () => {
    const years = searchParams.get("range_yearsInOperation");
    return years
      ? (years.split(",") || []).map((item: string) => Number(item))
      : [0, 10];
  };

  const getMaxAllocation = () => {
    const allocation = searchParams.get("range_maxAllocation");
    return allocation
      ? (allocation.split(",") || []).map((item: string) => Number(item))
      : [100000, 6000000];
  };

  const getArrayParam = (key: string) => {
    const value = searchParams.get(key);
    return value?.split(",") || [];
  };

  const filters = {
    range_yearsInOperation: getYearsInOperation(),
    // assets: getArrayParam("assets"),
    paymentMethods: getArrayParam("paymentMethods"),
    payoutMethods: getArrayParam("payoutMethods"),
    platforms: getArrayParam("platforms"),
    drawdown: getArrayParam("drawdown"),
    otherFeatures: getArrayParam("otherFeatures"),
    programType: getArrayParam("programType"),
    range_maxAllocation: getMaxAllocation(),
    countries: getArrayParam("countries"),
  };

  const toggleMultiSelect = (key: string, value: string) => {
    const current = (filters[key as keyof typeof filters] as string[]) ?? [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    handleSetSearchParams({ [key]: updated.join(",") }, searchParams, router);
  };

  const resetFilters = () => {
    router.push(window.location.pathname, { scroll: false });
  };

  const getExpandedItems = () => {
    const expanded = searchParams.get("expanded");
    return expanded ? expanded.split(",") || [] : [];
  };

  const handleAccordionChange = (values: string[]) => {
    handleSetSearchParams({ expanded: values.join() }, searchParams, router);
  };

  const items = (
    <>
      <Accordion
        type="multiple"
        value={getExpandedItems()}
        onValueChange={handleAccordionChange}
        className="w-full"
      >
        <AccordionItem value="countries" className="border-gray-800">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline">
            {t("countries")}
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            <p className="text-xs text-gray-400 mb-3">
              {t("countriesDescription")}
            </p>
            <div className="flex flex-wrap gap-2">
              {countryList.map((country) => (
                <Badge
                  className="cursor-pointer"
                  key={country.value}
                  variant={
                    (filters["countries"] ?? []).includes(country.value)
                      ? "defaultBH"
                      : "outline"
                  }
                  onClick={() => toggleMultiSelect("countries", country.value)}
                >
                  {country.name}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Payment methods  */}
        <AccordionItem value="paymentMethods" className="border-gray-800">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline">
            {t("paymentMethods")}
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            <div className="flex flex-wrap gap-2">
              {paymentMethods?.map((method: PaymentMethod) => (
                <Badge
                  className="cursor-pointer"
                  key={method.id}
                  variant={
                    filters["paymentMethods"].includes(method.id)
                      ? "defaultBH"
                      : "outline"
                  }
                  onClick={() => toggleMultiSelect("paymentMethods", method.id)}
                >
                  {method.title}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Payout methods  */}
        <AccordionItem value="payoutMethods" className="border-gray-800">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline">
            {t("payoutMethods")}
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            <div className="flex flex-wrap gap-2">
              {paymentMethods?.map((method: PaymentMethod) => (
                <Badge
                  className="cursor-pointer"
                  key={method.id}
                  variant={
                    filters["payoutMethods"].includes(method.id)
                      ? "defaultBH"
                      : "outline"
                  }
                  onClick={() => toggleMultiSelect("payoutMethods", method.id)}
                >
                  {method.title}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* drawdown  */}
        <AccordionItem value="drawdown" className="border-gray-800">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline">
            {t("drawdown")}
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            <div className="flex flex-wrap gap-2">
              {[
                { name: t("balanceBased"), value: "balanceBased" },
                { name: t("equityBased"), value: "equityBased" },
                { name: t("trailingEod"), value: "trailingEod" },
                { name: t("trailingIntraday"), value: "trailingIntraday" },
                { name: t("smartDd"), value: "smartDd" },
              ].map((method) => (
                <Badge
                  className="cursor-pointer"
                  key={method.value}
                  variant={
                    filters.drawdown.includes(method.value)
                      ? "defaultBH"
                      : "outline"
                  }
                  onClick={() => toggleMultiSelect("drawdown", method.value)}
                >
                  {method.name}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* otherFeatures  */}
        <AccordionItem value="otherFeatures" className="border-gray-800">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline">
            {t("otherFeatures")}
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            <div className="flex flex-wrap gap-2">
              {[
                { name: t("expertAdvisor"), value: "expertAdvisor" },
                { name: t("newsTrading"), value: "newsTrading" },
                { name: t("overnightHolding"), value: "overnightHolding" },
                { name: t("weekendHolding"), value: "weekendHolding" },
                { name: t("swapFreeAccount"), value: "swapFreeAccount" },
                { name: t("tradeCopying"), value: "tradeCopying" },
              ].map((method) => (
                <Badge
                  className="cursor-pointer"
                  key={method.value}
                  variant={
                    filters.otherFeatures.includes(method.value)
                      ? "defaultBH"
                      : "outline"
                  }
                  onClick={() =>
                    toggleMultiSelect("otherFeatures", method.value)
                  }
                >
                  {method.name}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Years in Operation */}
        <AccordionItem
          value="range_yearsInOperation"
          className="border-gray-800"
        >
          <AccordionTrigger className="text-sm font-semibold hover:no-underline">
            {t("yearsInOperation")}
          </AccordionTrigger>
          <AccordionContent>
            <CustomSlider max={10} min={0} name="range_yearsInOperation" />
          </AccordionContent>
        </AccordionItem>

        {/* Assets */}
        {/* <AccordionItem value="assets" className="border-gray-800">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline">
            {t("assets")}
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            <div className="flex flex-wrap gap-2">
              {[
                { name: t("fx"), value: "fx" },
                { name: t("energy"), value: "energy" },
                { name: t("stocks"), value: "stocks" },
                { name: t("crypto"), value: "crypto" },
                { name: t("indices"), value: "indices" },
                { name: t("otherCommodities"), value: "otherCommodities" },
                { name: t("metals"), value: "metals" },
              ].map((asset) => (
                <Badge
                  className="cursor-pointer"
                  key={asset.value}
                  variant={
                    filters["assets"].includes(asset.value)
                      ? "defaultBH"
                      : "outline"
                  }
                  onClick={() => toggleMultiSelect("assets", asset.value)}
                >
                  {asset.name}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem> */}

        {/* Platforms */}
        <AccordionItem value="platforms" className="border-gray-800">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline">
            {t("platforms")}
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform: Platform_T) => (
                <Badge
                  key={platform.id}
                  variant={
                    filters["platforms"].includes(platform.id)
                      ? "defaultBH"
                      : "outline"
                  }
                  onClick={() => toggleMultiSelect("platforms", platform.id)}
                  className="cursor-pointer"
                >
                  {platform.title}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Program Type */}
        <AccordionItem value="programType" className="border-gray-800">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline">
            {t("programType")}
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pt-4">
            <div className="flex flex-wrap gap-2">
              {[
                { name: t("INSTANT"), value: "INSTANT" },
                { name: t("oneStep"), value: "STEP1" },
                { name: t("twoStep"), value: "STEP2" },
                { name: t("threeStep"), value: "STEP3" },
                { name: t("fourStep"), value: "STEP4" },
              ].map((type) => (
                <Badge
                  className="cursor-pointer"
                  key={type.value}
                  variant={
                    filters.programType.includes(type.value)
                      ? "defaultBH"
                      : "outline"
                  }
                  onClick={() => toggleMultiSelect("programType", type.value)}
                >
                  {type.name}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Max Allocation */}
        <AccordionItem value="range_maxAllocation" className="border-gray-800">
          <AccordionTrigger className="text-sm font-semibold hover:no-underline">
            {t("maxAllocation")}
          </AccordionTrigger>
          <AccordionContent>
            <CustomSlider
              max={6000000}
              min={100000}
              name="range_maxAllocation"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        variant="link"
        className="w-full text-success hover:bg-transparent"
        onClick={resetFilters}
      >
        {t("resetFilter")}
      </Button>
    </>
  );

  const handleSetCategory = () => {
    handleSetSearchParams({ filterOpen: "" }, searchParams, router);
  };

  return (
    <>
      <div
        className={cn(
          "w-sm hidden lg:block pr-8 transition-all duration-300 space-y-4 rounded-lg bg-background text-foreground overflow-hidden",
          !filterOpen && "w-0 pr-0",
        )}
      >
        {items}
      </div>
      {isMobile && (
        <Dialog open={filterOpen} onOpenChange={handleSetCategory}>
          <DialogContent className="max-w-full! h-full p-4 overflow-auto bg-background text-foreground lg:hidden flex justify-center items-center">
            <div className="w-full max-w-md max-h-[90vh] overflow-auto">
              {items}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
