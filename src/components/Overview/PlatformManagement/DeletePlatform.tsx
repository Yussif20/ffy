"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDeletePlatformMutation } from "@/redux/api/platformApi";
import { toast } from "sonner";

interface Platform {
  id: string;
  title: string;
}

interface DeleteplatformProps {
  platform: Platform;
  children?: React.ReactNode;
}

export default function Deleteplatform({
  platform,
  children,
}: DeleteplatformProps) {
  const [deletePlatform, { isLoading: deleteLoading }] =
    useDeletePlatformMutation();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting platform method...");

    try {
      await deletePlatform(platform.id).unwrap();
      toast.success("Platform method deleted successfully", { id: toastId });
      setOpenDialog(false);
    } catch (error) {
      toast.error("Failed to delete platform method", { id: toastId });
    }
  };

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger asChild>
        {children || (
          <Button variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            platform method{" "}
            <span className="font-semibold text-foreground">
              "{platform.title}"
            </span>{" "}
            from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteLoading}
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
