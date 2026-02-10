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
import { useDeletePaymentMethodMutation } from "@/redux/api/paymentMethodApi";
import { toast } from "sonner";

interface PaymentMethod {
  id: string;
  title: string;
}

interface DeletePayMethodProps {
  paymentMethod: PaymentMethod;
  children?: React.ReactNode;
}

export default function DeletePayMethod({
  paymentMethod,
  children,
}: DeletePayMethodProps) {
  const [deletePaymentMethod, { isLoading: deleteLoading }] =
    useDeletePaymentMethodMutation();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting payment method...");

    try {
      await deletePaymentMethod(paymentMethod.id).unwrap();
      toast.success("Payment method deleted successfully", { id: toastId });
      setOpenDialog(false);
    } catch (error) {
      toast.error("Failed to delete payment method", { id: toastId });
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
            payment method{" "}
            <span className="font-semibold text-foreground">
              "{paymentMethod.title}"
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
