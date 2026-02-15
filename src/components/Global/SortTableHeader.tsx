"use client";
import { useQueryBuilder } from "@/hooks/usePagination";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { ReactNode } from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { cn } from "@/lib/utils";
import useIsArabic from "@/hooks/useIsArabic";

export default function SortTableHeader({
  headers,
  skipSort = false,
  skipSortOptionFor = [],
}: {
  headers: {
    label: string | ReactNode;
    field: string;
    id?: string;
    hideSort?: boolean;
    className?: string;
    center?: boolean;
    tooltip?: string;
  }[];
  skipSort?: boolean;
  skipSortOptionFor?: string[];
}) {
  const { setParam, getParam } = useQueryBuilder();
  const isArabic = useIsArabic();
  const sortBy = getParam("sort") || "";

  const handleSort = (field: string, hideSort?: boolean) => {
    if (hideSort) return;
    let newSortBy = field;

    if (sortBy === field) {
      newSortBy = `-${field}`;
    } else if (sortBy === `-${field}`) {
      newSortBy = "";
    }

    setParam("sort", newSortBy);
  };

  return (
    <TableHeader>
      <TableRow className="uppercase">
        {headers.map((header) => {
          const skipIcons = skipSortOptionFor.includes(header.field);

          return (
            <TableHead
              center={header.center || false}
              key={header.id ?? header.field}
              title={header.tooltip}
              className={cn(
                "cursor-pointer select-none border relative",
                header.className,
                isArabic ? "text-base font-semibold" : "",
                header.tooltip ? "underline decoration-dotted decoration-foreground/30 underline-offset-4" : "",
              )}
              onClick={() => handleSort(header.field, header.hideSort)}
            >
              <div className="flex items-center gap-2">
                {header.label}

                {!header.hideSort && !skipSort && !skipIcons && (
                  <>
                    {sortBy === header.field && <ChevronUp size={16} />}
                    {sortBy === `-${header.field}` && <ChevronDown size={16} />}
                    {sortBy !== header.field &&
                      sortBy !== `-${header.field}` && (
                        <ChevronsUpDown size={16} />
                      )}
                  </>
                )}
              </div>
            </TableHead>
          );
        })}
      </TableRow>
    </TableHeader>
  );
}
