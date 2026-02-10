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
import { Plus } from "lucide-react";
import CustomForm from "@/components/Forms/CustomForm";
import CustomInput from "@/components/Forms/CustomInput";
import { useCreatePlatformMutation } from "@/redux/api/platformApi";
import { toast } from "sonner";
import ImageUpload from "./PMImageUpload";

export default function CreatePlatform() {
  const [create, { isLoading: createLoading }] = useCreatePlatformMutation();
  const [openDialog, setOpenDialog] = useState(false);

  const defaultValues = {
    title: "",
    logoUrl: "",
  };

  const handleSubmit = async (data: FieldValues) => {
    if (!data.title || !data.logoUrl) {
      toast.error("Please fill all the fields");
      return;
    }
    const toastId = toast.loading("Creating Plaform...");
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify({ title: data.title }));
      formData.append("logo", data.logoUrl);
      await create(formData).unwrap();
      toast.success("Plaform created successfully", { id: toastId });
      setOpenDialog(false);
    } catch (error) {
      toast.error("Failed to create Plaform", { id: toastId });
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <Button>
          <Plus /> Add Plaform
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Plaform
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
              placeholder="Enter Plaform title"
              required
            />
          </div>

          <ImageUpload />
          <DialogFooter className="space-x-2">
            <Button
              disabled={createLoading}
              type="button"
              variant="outline"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button disabled={createLoading} type="submit">
              {createLoading ? "Creating..." : "Add Plaform"}
            </Button>
          </DialogFooter>
        </CustomForm>
      </DialogContent>
    </Dialog>
  );
}
