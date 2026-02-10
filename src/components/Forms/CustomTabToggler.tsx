"use client";

import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";

type TTabOption = {
  label: string;
  value: string | boolean;
};

type TCustomTabTogglerProps = {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  options: TTabOption[];
  optionClass?: string;
  className?: string; // wrapper
  labelClassName?: string;
  buttonClassName?: string;
};

export default function CustomTabToggler({
  name,
  label,
  required,
  disabled,
  options,
  className,
  labelClassName,
  buttonClassName,
  optionClass,
}: TCustomTabTogglerProps) {
  const {
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "This field is required" : false }}
      render={({ field }) => (
        <div className={cn("flex flex-col gap-2", className)}>
          {/* Label */}
          {label && (
            <label
              htmlFor={name}
              className={cn("text-sm font-semibold", labelClassName)}
            >
              {label}
            </label>
          )}

          {/* Buttons */}
          <div className={cn("grid grid-cols-2 gap-4", optionClass)}>
            {options.map((opt) => (
              <Button
                key={opt.value as any}
                type="button"
                disabled={disabled || isSubmitting}
                className={cn("w-full", buttonClassName)}
                variant={field.value === opt.value ? "outline" : "outline2"}
                onClick={() =>
                  setValue(name, opt.value, { shouldValidate: true })
                }
              >
                {opt.label}
              </Button>
            ))}
          </div>

          {/* Error */}
          {errors?.[name] && (
            <small className="text-red-500 text-sm">
              {errors?.[name]?.message as string}
            </small>
          )}
        </div>
      )}
    />
  );
}
