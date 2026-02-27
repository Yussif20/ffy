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

import { PaymentMethod } from "@/types/firm.types";
import { useGetAllPaymentMethodQuery } from "@/redux/api/paymentMethodApi";
import { useSearchParams } from "next/navigation";
import TableSkeleton from "@/components/Global/TableSkeleton";
import Image from "next/image";
import CreatePayMethod from "./CreatePayMethod";
import UpdatePayMethod from "./UpatePayMethod";
import DeletePayMethod from "./DeletePayMethod";

export default function PayMethodManagement() {
  const t = useTranslations("Overview.payMethodManagement");
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const query = [];
  search && query.push({ name: "search", value: search });
  const { data, isLoading } = useGetAllPaymentMethodQuery(query);

  const paymentMethods: PaymentMethod[] = data?.data || [];

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
        <CreatePayMethod />
      </div>

      {isLoading ? (
        <TableSkeleton />
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
              {paymentMethods.map((method) => (
                <TableRow key={method.id}>
                  <TableCell>
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <Image
                        src={method.logoUrl}
                        alt="image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{method.title}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 max-w-max">
                      {" "}
                      <UpdatePayMethod paymentMethod={method}>
                        <Button size="sm" variant="outline">
                          {t("edit")}
                        </Button>
                      </UpdatePayMethod>
                      <DeletePayMethod paymentMethod={method}>
                        <Button size="sm" variant="destructive">
                          {t("delete")}
                        </Button>
                      </DeletePayMethod>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {paymentMethods.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    {t("noPaymentMethods")}
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
