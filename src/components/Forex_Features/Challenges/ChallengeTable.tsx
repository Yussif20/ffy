"use client";
import { Pagination } from "@/components/Global/Pagination";
import SortTableHeader from "@/components/Global/SortTableHeader";
import { Table, TableBody } from "@/components/ui/table";
import ChallengeRow from "./ChallengeRow";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetAllChallengesQuery } from "@/redux/api/challenge";
import { TChallenge } from "@/types/Challenge ";
import TableSkeleton from "@/components/Global/TableSkeleton";
import { useAppSelector } from "@/redux/store";
import { useCurrentUser } from "@/redux/authSlice";
import useGetParams from "@/hooks/useGetParams";
import { TQueryParam } from "@/types";
import useIsFutures from "@/hooks/useIsFutures";

export default function ChallengeTable({
  companySlug,
  locale,
}: {
  companySlug?: string;
  locale: string;
}) {
  const t = useTranslations("Challenges");
  const params = useSearchParams();
  const isArabic = locale === "ar";
  const user = useAppSelector(useCurrentUser);
  const role = user?.role;
  const {
    countries,
    paymentMethods,
    payoutMethods,
    yearsInOperation,
    assets,
    platforms,
    programType,
    range_maxAllocation,
    drawdowns,
    otherFeatures,
  } = useGetParams();
  const isFutures = useIsFutures();
  const page = Number(params.get("page")) || 1;
  const accounsSize = params.get("size") || "";
  const accountSizeRange = params.get("size_range") || "";
  const in_steps = params.get("in_steps") || "";
  const searchTerm = params.get("search") || "";

  const sort = params.get("sort") || "";
  const queries: TQueryParam[] = [
    { name: "page", value: page },
    { name: "limit", value: 10 },
    { name: "searchTerm", value: searchTerm },
    {
      name: "firm.firmType",
      value: isFutures ? "FUTURES" : "FOREX",
    },
  ];

  if (sort) {
    let value = sort[0] === "-" ? sort.slice(1) : sort;
    const valuePrefix = sort[0] === "-" ? "-" : "";
    if (value === "firm") value = "firm.title";

    queries.push({ name: "sort", value: valuePrefix + value });
  }

  if (countries) {
    queries.push({ name: "firm.oneItemArray_countries", value: countries });
  }

  if (paymentMethods) {
    queries.push({
      name: "firm.paymentMethods.oneItemArray_id",
      value: paymentMethods,
    });
  }

  if (companySlug) {
    queries.push({ name: "firm.slug", value: companySlug });
  }

  if (payoutMethods) {
    queries.push({
      name: "firm.payoutMethods.oneItemArray_id",
      value: payoutMethods,
    });
  }

  if (yearsInOperation) {
    queries.push({
      name: "firm.range_yearsInOperation",
      value: yearsInOperation,
    });
  }

  if (in_steps) {
    queries.push({ name: "in_steps", value: in_steps });
  }

  if (assets) {
    queries.push({ name: "firm.leverages.oneItemArray_assets", value: assets });
  }

  if (platforms) {
    queries.push({ name: "firm.platforms.oneItemArray_id", value: platforms });
  }

  if (programType) {
    queries.push({
      name: "firm.oneItemArray_programTypes",
      value: programType,
    });
  }

  if (drawdowns) {
    queries.push({ name: "firm.oneItemArray_drawDowns", value: drawdowns });
  }

  if (otherFeatures) {
    queries.push({
      name: "firm.oneItemArray_otherFeatures",
      value: otherFeatures,
    });
  }

  if (range_maxAllocation) {
    queries.push({
      name: "firm.range_maxAllocation",
      value: range_maxAllocation,
    });
  }

  if (accounsSize) {
    queries.push({ name: "inNumber_accountSize", value: accounsSize });
  } else {
    if (accountSizeRange) {
      queries.push({ name: "range_accountSize", value: accountSizeRange });
    }
  }

  const {
    data: totallBookings,
    isLoading,
    isFetching,
  } = useGetAllChallengesQuery(queries);

  const totalPages = totallBookings?.meta?.totalPage || 1;

  const _headers = [
    {
      label: t("firm"),
      field: "title",
      className: "hidden md:table-cell",
    },
    {
      label: t("firm"),
      field: "title",
      hideSort: true,
      className: "table-cell md:hidden",
    },
    {
      label: t("name"),
      field: "title",
      className: "table-cell md:hidden",
    },
    { label: t("accountSize"), field: "accountSize" },
    { label: t("steps"), field: "steps" },
    { label: t("profitTarget"), field: "profitTarget" },
    { label: t("dailyLoss"), field: "dailyLoss" },
    { label: t("maxLoss"), field: "maxLoss" },
    { label: t("profitSplit"), field: "profitSplit" },
    { label: t("payoutFrequency"), field: "payoutFrequency" },
    { label: t("price"), field: "price" },
    role === "SUPER_ADMIN"
      ? { label: t("action"), field: "action", hideSort: true }
      : null,
  ];

  const headers = _headers.filter(
    (h): h is { label: string; field: string } => h !== null,
  );

  if (isLoading || isFetching)
    return (
      <TableSkeleton
        className="w-full"
        showHeader={false}
        showViewAll={true}
        headers={headers.map((header) => header.label)}
      />
    );

  return (
    <div className="max-w-full w-full space-y-8 overflow-hidden">
      <Table>
        <SortTableHeader headers={headers} />
        <TableBody colSpan={7}>
          {totallBookings?.data?.map((item: TChallenge, key: number) => (
            <ChallengeRow isArabic={isArabic} key={key} challenge={item} />
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
}
