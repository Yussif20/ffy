"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import TTTextEditor from "./TTTextEditor";

type TEditorFieldProps = {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  editorClassName?: string;
  placeholder?: string;
};

const RichTextEditor2 = ({
  name,
  label,
  required,
  className,
  labelClassName,
}: TEditorFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "This field is required" : false }}
      render={({ field }) => {
        return (
          <div className={cn("flex flex-col gap-2", className)}>
            {label && (
              <Label htmlFor={name} className={labelClassName}>
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </Label>
            )}
            <TTTextEditor
              onChange={field.onChange}
              value={field.value}
              errors={errors}
            />
          </div>
        );
      }}
    />
  );
};

export default RichTextEditor2;
