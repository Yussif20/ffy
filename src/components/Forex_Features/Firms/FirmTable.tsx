"use client";

import { Pagination } from "@/components/Global/Pagination";
import SortTableHeader from "@/components/Global/SortTableHeader";
import TableSkeleton from "@/components/Global/TableSkeleton";
import { Table, TableBody } from "@/components/ui/table";
import { TMeta } from "@/types";
import { SinglePropFirm } from "@/types/firm.types";
import { useTranslations } from "next-intl";
import FirmRow from "./FirmRow";
import { useAppSelector } from "@/redux/store";
import { useCurrentUser } from "@/redux/authSlice";
import { type ColumnDef } from "@/hooks/useColumnCustomization";
import { useMemo } from "react";

export const ALL_FIRM_COLUMNS: ColumnDef[] = [
  { key: "country", labelKey: "country" },
  { key: "yearsInOperation", labelKey: "yearsInOperation" },
  { key: "platforms", labelKey: "platforms" },
  { key: "maxAllocation", labelKey: "maxAllocation" },
  { key: "discount", labelKey: "discount" },
];

export const SHORT_FIRM_COLUMNS: ColumnDef[] = [
  { key: "country", labelKey: "country" },
  { key: "yearsInOperation", labelKey: "yearsInOperation" },
];

export default function FirmTable({
  firms = [],
  meta,
  isLoading,
  shortVersion,
  orderedVisibleKeys,
}: {
  firms: SinglePropFirm[];
  meta: TMeta;
  isFuturesPage: boolean;
  isLoading: boolean;
  shortVersion?: boolean;
  orderedVisibleKeys?: string[];
}) {
  const t = useTranslations("Firms");
  const user = useAppSelector(useCurrentUser);
  const isAdmin = user?.role === "SUPER_ADMIN";

  // Fallback when no customization is passed (e.g. shortVersion on other pages)
  const visibleKeys = orderedVisibleKeys ?? (shortVersion
    ? SHORT_FIRM_COLUMNS.map((c) => c.key)
    : ALL_FIRM_COLUMNS.map((c) => c.key));

  const headers = useMemo(() => {
    const firmIdentityHeaders = [
      {
        label: t("firm"),
        field: "title",
        hideSort: !!shortVersion,
        className: "hidden md:table-cell",
      },
      {
        label: t("firmLogo"),
        id: "titleLogo",
        field: "title",
        hideSort: true,
        className: "table-cell md:hidden",
      },
      {
        label: t("firmName"),
        id: "titleName",
        field: "title",
        hideSort: !!shortVersion,
        className: "table-cell md:hidden",
      },
    ];

    const columnHeaderMap: Record<string, { label: string; field: string; hideSort: boolean }> = {
      country: { label: t("country"), field: "country", hideSort: !!shortVersion },
      yearsInOperation: { label: t("yearsInOperation"), field: "yearsInOperation", hideSort: !!shortVersion },
      platforms: { label: t("platforms"), field: "platforms", hideSort: !!shortVersion },
      maxAllocation: { label: t("maxAllocation"), field: "maxAllocation", hideSort: !!shortVersion },
      discount: { label: t("discount"), field: "discount", hideSort: !!shortVersion },
    };

    const visibleHeaders = visibleKeys
      .map((key) => columnHeaderMap[key])
      .filter(Boolean);

    const actionHeader = isAdmin
      ? [{ label: t("action"), field: "action", hideSort: true }]
      : [];

    return [...firmIdentityHeaders, ...visibleHeaders, ...actionHeader];
  }, [t, shortVersion, visibleKeys, isAdmin]);

  const colSpan = 3 + visibleKeys.length + (isAdmin ? 1 : 0);

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="max-w-full w-full space-y-8 overflow-hidden">
      <Table>
        <SortTableHeader headers={headers} />
        <TableBody colSpan={colSpan}>
          {firms.map((item, index) => (
            <FirmRow
              visibleColumns={visibleKeys}
              key={item.id}
              company={item}
              prevCompany={firms[index - 1]}
              nextCompany={firms[index + 1]}
              userRole={user?.role}
            />
          ))}
        </TableBody>
      </Table>
      <Pagination totalPages={meta?.totalPage ?? 0} />
    </div>
  );
}
