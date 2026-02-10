"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { handleSetSearchParams } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { changeGmt, useCurrentGmt } from "@/redux/gmtSlice";
import { AddNews } from "./NewsActions";

export default function HINFilter() {
  const t = useTranslations("HighImpactNews");
  const searchParams = useSearchParams();
  const router = useRouter();
  const gmt = useAppSelector(useCurrentGmt);
  const dispatch = useAppDispatch();
  const weeks: { name: string; value: string }[] = [
    { name: t("previousWeek"), value: "previous" },
    { name: t("currentWeek"), value: "current" },
    { name: t("nextWeek"), value: "next" },
  ];

  const selectedWeek = searchParams.get("week") || "current";

  const handleSetUrl = (value: Record<string, string>) => {
    handleSetSearchParams(value, searchParams, router);
  };

  const options: { label: string; value: string }[] = Array.from(
    { length: 27 },
    (_, i) => {
      const offset = i - 12;
      return {
        label: `GMT${offset >= 0 ? "+" + offset : offset}`,
        value: `${offset}`,
      };
    },
  );

  const handleGmtChange = (value: string) => {
    dispatch(changeGmt(value));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 md:gap-4 items-center justify-center">
        {weeks.map((item) => {
          const isActive = selectedWeek === item.value;
          return (
            <Button
              key={item.value}
              className="px-3! sm:px-6! text-xs sm:text-sm"
              onClick={() => handleSetUrl({ week: item.value })}
              variant={isActive ? "outline" : "outline2"}
            >
              {item.name}
            </Button>
          );
        })}
      </div>

      <div className="flex justify-end gap-2 items-center">
        <div>
          <Select defaultValue={gmt} onValueChange={handleGmtChange}>
            <SelectTrigger className="px-7 w-full">
              <SelectValue placeholder={t("gmt")} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <AddNews>
          <Button>{t("addNews")}</Button>
        </AddNews>
      </div>
    </div>
  );
}
