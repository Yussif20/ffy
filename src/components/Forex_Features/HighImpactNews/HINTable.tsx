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
import { useAppSelector } from "@/redux/store";
import { useCurrentUser } from "@/redux/authSlice";

export default function HINTable() {
  const searchparams = useSearchParams();
  const userRole = useAppSelector(useCurrentUser)?.role;
  const week = searchparams.get("week") || "current";
  const { data, isLoading } = useGetAllNewsQuery([
    { name: "tab", value: week },
  ]);
  const t = useTranslations("HighImpactNews");
  if (isLoading) {
    return (
      <TableSkeleton headers={[t("gmtz"), t("currency"), t("eventTitle")]} />
    );
  }
  const newsData = data?.data || [];
  return (
    <div className="max-w-full w-full space-y-8">
      {newsData.map((item) => {
        return (
          <div className="space-y-5" key={item.date}>
            <Button
              className="cursor-default!"
              variant={"outline"}
              linearClassName="max-w-max"
            >
              <Calendar className="text-primary" /> {item.date}
            </Button>
            <Table>
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
                {item.news.map((item, idx) => (
                  <HINRow key={idx} news={item} />
                ))}
              </TableBody>
            </Table>
          </div>
        );
      })}
    </div>
  );
}
