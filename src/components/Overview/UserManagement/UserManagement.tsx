"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  useGetAllUserAdminQuery,
  useUpdateUserAdminMutation,
} from "@/redux/api/userApi";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pagination } from "@/components/Global/Pagination";
import TableSkeleton from "@/components/Global/TableSkeleton";
import SearchForm from "@/components/Forms/SearchForm";
import Title from "@/components/Global/Title";

export type TUser = {
  id: string;
  fullName: string;
  email: string;
  status: "ACTIVE" | "BLOCKED";
  profile: string | null;
  location: string | null;
  authType: "EMAIL" | "GOOGLE" | "FACEBOOK";
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  phoneNumber: string | null;
  createdAt?: string;
};

export default function UserManagement() {
  const params = useSearchParams();
  const router = useRouter();
  const page = Number(params.get("page")) || 1;
  const searchTerm = params.get("search") || "";
  // Get all users
  const { data, isLoading, isFetching } = useGetAllUserAdminQuery([
    { name: "page", value: page },
    { name: "searchTerm", value: searchTerm },
  ]);

  const users: TUser[] = data?.data?.users || [];

  // Mutation for updating user status
  const [updateUserStatus, { isLoading: isStatusUpdating }] =
    useUpdateUserAdminMutation();

  const totalPages = data?.meta?.totalPage || 1;

  const handleStatusUpdate = async (user: TUser) => {
    const newStatus = user.status === "BLOCKED" ? "ACTIVE" : "BLOCKED";

    await updateUserStatus({
      id: user.id,
      data: { status: newStatus },
    });
    toast.success("User status updated successfully");
    // Refresh page after update
    router.refresh();
  };

  return (
    <div>
      <div className="mb-8">
        <Title>User Management</Title>
      </div>

      <div className="mb-6">
        <SearchForm />
      </div>

      {isLoading || isFetching ? (
        <TableSkeleton
          headers={["Name", "Email", "Role", "Status", "Join Date", "Actions"]}
        />
      ) : (
        <>
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm w-full overflow-hidden border-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody colSpan={6}>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {user.fullName}
                    </TableCell>

                    <TableCell className="text-sm">{user.email}</TableCell>

                    <TableCell className="text-sm">{user.role}</TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          user.status === "ACTIVE"
                            ? "default"
                            : user.status === "BLOCKED"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-sm">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "-"}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant={
                          user.status === "BLOCKED" ? "default" : "destructive"
                        }
                        disabled={isStatusUpdating}
                        onClick={() => handleStatusUpdate(user)}
                      >
                        {user.status === "BLOCKED" ? "Unban" : "Ban"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className=" mt-4">
            <Pagination totalPages={totalPages} />
          </div>

          {/* Count */}
          <div className="mt-6 text-sm text-muted-foreground">
            Showing {users.length} of {users.length} users
          </div>
        </>
      )}
    </div>
  );
}
