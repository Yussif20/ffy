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
import { useTranslations } from "next-intl";
import { Pagination } from "@/components/Global/Pagination";
import TableSkeleton from "@/components/Global/TableSkeleton";
import SearchForm from "@/components/Forms/SearchForm";

export type TUser = {
  id: string;
  fullName: string;
  email: string;
  status: "ACTIVE" | "BLOCKED" | "INACTIVE" | "DELETED";
  profile: string | null;
  location: string | null;
  authType: "EMAIL" | "GOOGLE" | "FACEBOOK";
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  phoneNumber: string | null;
  createdAt?: string;
};

export default function UserManagement() {
  const t = useTranslations("Overview.userManagement");
  const params = useSearchParams();
  const router = useRouter();
  const page = Number(params.get("page")) || 1;
  const searchTerm = params.get("search") || "";
  // Get all users
  const { data, isLoading, isFetching } = useGetAllUserAdminQuery([
    { name: "page", value: page },
    { name: "limit", value: 10 },
    { name: "searchTerm", value: searchTerm },
  ]);

  const users: TUser[] =
    (data?.data?.users as TUser[] | undefined)?.filter(
      (user) => user.status !== "DELETED",
    ) || [];

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
    toast.success(t("userStatusUpdated"));
    // Refresh page after update
    router.refresh();
  };

  const handleDeleteUser = async (user: TUser) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${user.fullName}?`,
    );
    if (!confirmed) return;

    await updateUserStatus({
      id: user.id,
      data: { status: "DELETED" },
    });
    toast.success("User removed successfully");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border/60">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          {t("title")}
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <SearchForm />
      </div>

      {isLoading || isFetching ? (
        <TableSkeleton />
      ) : (
        <>
          <div className="w-full overflow-x-auto">
            <div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("name")}</TableHead>
                    <TableHead>{t("email")}</TableHead>
                    <TableHead>{t("role")}</TableHead>
                    <TableHead>{t("status")}</TableHead>
                    <TableHead>{t("joinDate")}</TableHead>
                    <TableHead className="text-right">
                      {t("actions")}
                    </TableHead>
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
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant={
                              user.status === "BLOCKED"
                                ? "default"
                                : "destructive"
                            }
                            disabled={isStatusUpdating}
                            onClick={() => handleStatusUpdate(user)}
                          >
                            {user.status === "BLOCKED" ? t("unban") : t("ban")}
                          </Button>

                          {user.role !== "SUPER_ADMIN" && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={isStatusUpdating}
                              onClick={() => handleDeleteUser(user)}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Showing {users.length} of {users.length} users
            </p>
            <Pagination totalPages={totalPages} />
          </div>
        </>
      )}
    </div>
  );
}
