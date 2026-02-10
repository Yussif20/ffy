"use client";
import SearchForm from "@/components/Forms/SearchForm";
import Title from "@/components/Global/Title";

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
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const query = [];
  search && query.push({ name: "search", value: search });
  const { data, isLoading } = useGetAllPaymentMethodQuery(query);

  const paymentMethods: PaymentMethod[] = data?.data || [];

  return (
    <div>
      <div className="mb-8">
        <Title>Pay Method Management</Title>
      </div>

      <div className="flex justify-between items-center mb-6 flex-col md:flex-row gap-4">
        <div className="w-full">
          <SearchForm />
        </div>

        <div className="w-full md:w-auto">
          <CreatePayMethod />
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton headers={["Logo", "Title", "Actions"]} />
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Actions</TableHead>
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
                          Edit
                        </Button>
                      </UpdatePayMethod>
                      <DeletePayMethod paymentMethod={method}>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </DeletePayMethod>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {paymentMethods.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    No payment methods found.
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
