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

import { useSearchParams } from "next/navigation";
import TableSkeleton from "@/components/Global/TableSkeleton";
import { useGetBrokersQuery } from "@/redux/api/brokerApi";
import { Broker } from "@/types/broker.type";
import CreateBroker from "./CreateBroker";
import UpdateBroker from "./UpdateBroker";
import DeleteBroker from "./DeleteBroker";

export default function BrokerManagement() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const query = [];
  search && query.push({ name: "search", value: search });
  const { data, isLoading } = useGetBrokersQuery(query);

  const brokers: Broker[] = data?.data?.brokers || [];

  return (
    <div>
      <div className="mb-8">
        <Title>Broker Management</Title>
      </div>

      <div className="flex justify-between items-center mb-6 flex-col md:flex-row gap-4">
        <div className="w-full">
          <SearchForm />
        </div>

        <div className="w-full md:w-auto">
          <CreateBroker />
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
                          Edit
                        </Button>
                      </UpdateBroker>
                      <DeleteBroker broker={broker}>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </DeleteBroker>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {brokers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    No brokers found.
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
