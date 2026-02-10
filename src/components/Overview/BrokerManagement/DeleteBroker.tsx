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
import { useDeleteBrokerMutation } from "@/redux/api/brokerApi";
import { toast } from "sonner";
import { Broker } from "@/types/broker.type";

interface DeleteBrokerProps {
  broker: Broker;
  children?: React.ReactNode;
}

export default function DeleteBroker({ broker, children }: DeleteBrokerProps) {
  const [deleteBroker, { isLoading: deleteLoading }] =
    useDeleteBrokerMutation();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting broker...");

    try {
      await deleteBroker(broker.id).unwrap();
      toast.success("Broker deleted successfully", { id: toastId });
      setOpenDialog(false);
    } catch (error) {
      toast.error("Failed to delete broker", { id: toastId });
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
            broker{" "}
            <span className="font-semibold text-foreground">
              "{broker.title}"
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
