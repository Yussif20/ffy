"use client";
import { Table, TableBody } from "@/components/ui/table";
import SortTableHeader from "@/components/Global/SortTableHeader";
import HINRow from "./HINRow";
import { useGetAllNewsQuery } from "@/redux/api/newsApi";
import TableSkeleton from "@/components/Global/TableSkeleton";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { useCurrentUser } from "@/redux/authSlice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { changeGmt, useCurrentGmt } from "@/redux/gmtSlice";

export default function HINTable() {
  const searchparams = useSearchParams();
  const userRole = useAppSelector(useCurrentUser)?.role;
  const gmt = useAppSelector(useCurrentGmt);
  const dispatch = useAppDispatch();
  const week = searchparams.get("week") || "current";
  const { data, isLoading } = useGetAllNewsQuery([
    { name: "tab", value: week },
  ]);
  const t = useTranslations("HighImpactNews");
  // Earliest date at top, newest at bottom (ascending by date)
  const newsData = (data?.data || []).slice().sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

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

  if (isLoading) {
    return (
      <TableSkeleton headers={[t("gmtz"), t("currency"), t("eventTitle")]} />
    );
  }

  return (
    <div className="max-w-full w-full space-y-8">
      <div className="flex items-center justify-end">
        <Select value={gmt} onValueChange={handleGmtChange}>
          <SelectTrigger className="px-7 w-full max-w-[180px] h-9" withoutLinearBorder>
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
      {newsData.map((item) => {
        return (
          <div className="space-y-5" key={item.date}>
            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
              <Button
                className="cursor-default!"
                variant={"outline"}
                linearClassName="max-w-max"
              >
                <Calendar className="text-primary" /> {item.date}
              </Button>
            </div>
            <Table className="text-xs md:text-sm">
              <SortTableHeader
                headers={[
                  { label: t("gmtz"), field: "gmtz", center: true },
                  { label: t("currency"), field: "currency", center: true },
                  { label: t("eventTitle"), field: "eventTitle", center: true },
                  ...(userRole === "SUPER_ADMIN"
                    ? [{ label: t("actions"), field: "actions", center: true }]
                    : []),
                ]}
                skipSort
              />
              <TableBody colSpan={userRole === "SUPER_ADMIN" ? 4 : 3}>
                {item.news.map((newsItem, newsIndex) => (
                  <HINRow 
                    key={newsItem.id} 
                    news={newsItem}
                    prevNews={item.news[newsIndex - 1]}
                    nextNews={item.news[newsIndex + 1]}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        );
      })}
    </div>
  );
}
