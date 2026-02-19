"use client";

import { useFormContext, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const Editor = dynamic(
  () => import("../blocks/editor-x/editor").then((m) => m.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="border rounded p-2 min-h-[100px] animate-pulse bg-muted" />
    ),
  },
);

type TEditorFieldProps = {
  name: string;
  label?: string;
  required?: boolean;
  className?: string; // container class
  labelClassName?: string;
  editorClassName?: string; // editor wrapper class
  placeholder?: string;
};

// Default empty Lexical editor state
const EMPTY_EDITOR_STATE = {
  root: {
    children: [
      {
        children: [],
        direction: null,
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: null,
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

const RichTextEditor = ({
  name,
  label,
  required,
  className,
  labelClassName,
  editorClassName,
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
        // Parse the value or use empty editor state
        let value;
        try {
          value = field.value ? JSON.parse(field.value) : EMPTY_EDITOR_STATE;

          // Validate that the parsed value has the required structure
          if (!value?.root || !value.root.type) {
            value = EMPTY_EDITOR_STATE;
          }
        } catch (error) {
          console.error("Error parsing editor value:", error);
          value = EMPTY_EDITOR_STATE;
        }

        return (
          <div className={cn("flex flex-col", className)}>
            {label && (
              <label
                htmlFor={name}
                className={cn("text-sm font-semibold pb-2", labelClassName)}
              >
                {label}
              </label>
            )}

            <div
              className={cn(
                "border rounded p-2 min-h-[100px]",
                editorClassName
              )}
            >
              <Editor
                editorSerializedState={value}
                onSerializedChange={(val) =>
                  field.onChange(JSON.stringify(val))
                }
              />
            </div>

            {errors?.[name] && (
              <small className="text-red-500 text-sm mt-1">
                {errors?.[name]?.message as string}
              </small>
            )}
          </div>
        );
      }}
    />
  );
};

export default RichTextEditor;
