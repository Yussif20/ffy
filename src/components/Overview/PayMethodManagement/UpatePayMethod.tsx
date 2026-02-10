"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FieldValues } from "react-hook-form";
import { Pencil } from "lucide-react";
import CustomForm from "@/components/Forms/CustomForm";
import CustomInput from "@/components/Forms/CustomInput";
import { useUpdatePaymentMethodMutation } from "@/redux/api/paymentMethodApi";
import { toast } from "sonner";
import ImageUpload from "./PMImageUpload";

interface PaymentMethod {
  id: string;
  title: string;
  logoUrl: string;
}

interface UpdatePayMethodProps {
  paymentMethod: PaymentMethod;
  children?: React.ReactNode;
}

export default function UpdatePayMethod({
  paymentMethod,
  children,
}: UpdatePayMethodProps) {
  const [update, { isLoading: updateLoading }] =
    useUpdatePaymentMethodMutation();
  const [openDialog, setOpenDialog] = useState(false);

  const defaultValues = {
    title: paymentMethod.title,
    logoUrl: "",
  };

  const handleSubmit = async (data: FieldValues) => {
    if (!data.title) {
      toast.error("Please fill all the fields");
      return;
    }

    const toastId = toast.loading("Updating payment method...");

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify({ title: data.title }));

      // Only append logo if it's a new file (not a URL string)
      if (data.logoUrl instanceof File) {
        formData.append("logo", data.logoUrl);
      }

      await update({ paymentMethodId: paymentMethod.id, formData }).unwrap();
      toast.success("Payment method updated successfully", { id: toastId });
      setOpenDialog(false);
    } catch (error) {
      toast.error("Failed to update payment method", { id: toastId });
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Update Payment Method
          </DialogTitle>
        </DialogHeader>
        <CustomForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          className="space-y-5 py-4"
        >
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <CustomInput
              type="text"
              name="title"
              fieldClassName="h-11"
              placeholder="Enter payment method title"
              required
            />
          </div>
          <ImageUpload logoUrl={paymentMethod.logoUrl} />
          <DialogFooter className="space-x-2">
            <Button
              disabled={updateLoading}
              type="button"
              variant="outline"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button disabled={updateLoading} type="submit">
              {updateLoading ? "Updating..." : "Update Payment Method"}
            </Button>
          </DialogFooter>
        </CustomForm>
      </DialogContent>
    </Dialog>
  );
}
