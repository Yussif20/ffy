"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Table({ className, containerClassName, ...props }: React.ComponentProps<"table"> & { containerClassName?: string }) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative w-full overflow-x-auto scrollbar-hide",
        "rounded-2xl border border-white/[0.08] bg-card/40 shadow-lg shadow-black/10 backdrop-blur-xl ring-1 ring-inset ring-white/[0.05]",
        containerClassName,
      )}
    >
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom border-collapse",
          "text-[11px] md:text-xs",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "[&_tr]:border-b-2 [&_tr]:border-primary/25 bg-gradient-to-r from-primary/[0.10] via-primary/[0.05] to-primary/[0.10]",
        className,
      )}
      {...props}
    />
  );
}

function TableBody({
  className,
  children,
  emptyMessage = "No data found.",
  colSpan,
  ...props
}: React.ComponentProps<"tbody"> & { emptyMessage?: string; colSpan: number }) {
  const newProps = { children, ...props };
  const hasChildren = React.Children.count(children) > 0;
  return (
    <tbody
      data-slot="table-body"
      className={cn(className)}
      {...newProps}
    >
      {hasChildren ? (
        children
      ) : (
        <tr data-slot="table-row" className="border-b border-border/40">
          <td
            data-slot="table-cell"
            className="py-8 px-3 md:py-12 md:px-4 align-middle text-center text-muted-foreground text-[11px] md:text-xs italic"
            colSpan={colSpan}
          >
            {emptyMessage}
          </td>
        </tr>
      )}
    </tbody>
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-gradient-to-r from-primary/[0.04] via-transparent to-primary/[0.04] border-t border-border/30 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-border/30 transition-all duration-200",
        "hover:bg-primary/[0.07] dark:hover:bg-primary/[0.10] data-[state=selected]:bg-primary/[0.08]",
        "even:bg-muted/30",
        "border-l-2 border-l-transparent hover:border-l-primary",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({
  className,
  children,
  center = false,
  ...props
}: React.ComponentProps<"th"> & { center?: boolean }) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground/90 text-left align-middle font-semibold whitespace-nowrap",
        "[&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        "py-2.5 px-2.5 md:py-4 md:px-3.5 tracking-tight",
        className,
      )}
      {...props}
    >
      {center ? (
        <div className="flex justify-center items-center">{children}</div>
      ) : (
        children
      )}
    </th>
  );
}

function TableCell({
  className,
  children,
  center = false,
  ...props
}: React.ComponentProps<"td"> & { center?: boolean }) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "align-middle whitespace-nowrap text-foreground/85",
        "[&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        "py-2.5 px-2.5 md:py-3.5 md:px-3.5",
        className,
      )}
      {...props}
    >
      {center ? (
        <div className="flex justify-center items-center">{children}</div>
      ) : (
        children
      )}
    </td>
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-xs font-medium", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
