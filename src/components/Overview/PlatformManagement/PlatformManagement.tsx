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
import Image from "next/image";
import { useGetAllPlatformQuery } from "@/redux/api/platformApi";
import { Platform } from "@/types";
import CreatePlatform from "./CreatePlatform";
import UpdatePlatform from "./UpdatePlatform";
import DeletePlatform from "./DeletePlatform";

export default function PlatformManagement() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const query = [];
  search && query.push({ name: "search", value: search });
  const { data, isLoading } = useGetAllPlatformQuery(query);

  const platforms: Platform[] = data?.data?.platforms || [];
  return (
    <div>
      <div className="mb-8">
        <Title>Platform Management</Title>
      </div>

      <div className="flex justify-between items-center mb-6 flex-col md:flex-row gap-4">
        <div className="w-full">
          <SearchForm />
        </div>

        <div className="w-full md:w-auto">
          <CreatePlatform />
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
              {platforms.map((platform) => (
                <TableRow key={platform.id}>
                  <TableCell>
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <Image
                        src={platform.logoUrl}
                        alt="image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{platform.title}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 max-w-max">
                      {" "}
                      <UpdatePlatform platform={platform}>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </UpdatePlatform>
                      <DeletePlatform platform={platform}>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </DeletePlatform>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {platforms.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    No platforms found.
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
