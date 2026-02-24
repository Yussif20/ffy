"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative w-full overflow-x-auto scrollbar-hide",
        "rounded-xl border border-border/60 bg-card/50 shadow-sm",
      )}
    >
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom text-xs border-collapse",
          "[&_th:first-child]:border-s [&_td:first-child]:border-s",
          "[&_th:first-child]:border-border/50 [&_td:first-child]:border-border/50",
          "[&_th:last-child]:border-r [&_td:last-child]:border-r",
          "[&_th:last-child]:border-border/50 [&_td:last-child]:border-border/50",
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
        "[&_tr]:border-b [&_tr]:border-border/60 bg-muted/30 dark:bg-foreground/5",
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
            className="py-12 px-4 align-middle text-center text-muted-foreground text-xs italic"
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
        "bg-muted/30 dark:bg-foreground/5 border-t border-border/60 font-medium [&>tr]:last:border-b-0",
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
        "border-b border-border/40 transition-colors duration-150",
        "hover:bg-muted/40 dark:hover:bg-foreground/5 data-[state=selected]:bg-muted/60",
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
        "text-foreground text-left align-middle font-semibold whitespace-nowrap",
        "[&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        "py-3.5 px-3 text-xs tracking-tight border-r border-border/50",
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
        "align-middle whitespace-nowrap text-foreground/90",
        "[&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        "py-3 px-3 text-xs border-r border-border/40",
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
