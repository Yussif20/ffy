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

export default function FirmTable({
  firms = [],
  meta,
  isLoading,
  shortVersion,
}: {
  firms: SinglePropFirm[];
  meta: TMeta;
  isFuturesPage: boolean;
  isLoading: boolean;
  shortVersion?: boolean;
}) {
  const t = useTranslations("Firms");
  const user = useAppSelector(useCurrentUser);
  const headers = [
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
    { label: t("country"), field: "country", hideSort: !!shortVersion },
    {
      label: t("yearsInOperation"),
      field: "yearsInOperation",
      hideSort: !!shortVersion,
    },
    ...(shortVersion
      ? []
      : [
        // {
        //   label: t("instruments"),
        //   field: "typeOfInstruments",
        //   hideSort: !!shortVersion,
        // },
        {
          label: t("platforms"),
          field: "platforms",
          hideSort: !!shortVersion,
        },
        {
          label: t("maxAllocation"),
          field: "maxAllocation",
          hideSort: !!shortVersion,
        },
        { label: t("discount"), field: "discount", hideSort: !!shortVersion },
      ]),
    ...(user?.role === "SUPER_ADMIN"
      ? [{ label: t("action"), field: "action", hideSort: true }]
      : []),
  ];

  if (isLoading)
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
        <TableBody colSpan={shortVersion ? 5 : 7}>
          {firms.map((item, index) => (
            <FirmRow
              shortVersion={shortVersion}
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
