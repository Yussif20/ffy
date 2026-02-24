"use client";
import SearchForm from "@/components/Forms/SearchForm";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { useSearchParams } from "next/navigation";
import TableSkeleton from "@/components/Global/TableSkeleton";
import { useGetBrokersQuery } from "@/redux/api/brokerApi";
import { Broker } from "@/types/broker.type";
import CreateBroker from "./CreateBroker";
import UpdateBroker from "./UpdateBroker";
import DeleteBroker from "./DeleteBroker";

export default function BrokerManagement() {
  const t = useTranslations("Overview.brokerManagement");
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const query = [];
  search && query.push({ name: "search", value: search });
  const { data, isLoading } = useGetBrokersQuery(query);

  const brokers: Broker[] = data?.data?.brokers || [];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border/60">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          {t("title")}
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <SearchForm />
        </div>
        <CreateBroker />
      </div>

      {isLoading ? (
        <TableSkeleton headers={[t("logo"), t("titleLabel"), t("actions")]} />
      ) : (
        <div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("logo")}</TableHead>
                <TableHead>{t("titleLabel")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody colSpan={3}>
              {brokers.map((broker) => (
                <TableRow key={broker.id}>
                  <TableCell>
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <img
                        src={broker.logoUrl}
                        alt="image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{broker.title}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 max-w-max">
                      {" "}
                      <UpdateBroker broker={broker}>
                        <Button size="sm" variant="outline">
                          {t("edit")}
                        </Button>
                      </UpdateBroker>
                      <DeleteBroker broker={broker}>
                        <Button size="sm" variant="destructive">
                          {t("delete")}
                        </Button>
                      </DeleteBroker>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {brokers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    {t("noBrokers")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
