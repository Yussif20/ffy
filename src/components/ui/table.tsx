"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto scrollbar-hide"
    >
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom text-sm border-collapse",
          "[&_th:first-child]:border-s [&_td:first-child]:border-s",
          "[&_th:first-child]:border-foreground/10 [&_td:first-child]:border-foreground/10",
          "[&_th:last-child]:border-r [&_td:last-child]:border-r",
          "[&_th:last-child]:border-foreground/10 [&_td:last-child]:border-foreground/10",
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
      className={cn("[&_tr]:border-b bg-card", className)}
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
        <tr data-slot="table-row" className="border-b">
          <td
            data-slot="table-cell"
            className="p-2 align-middle text-center h-24 text-muted-foreground"
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
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
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
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
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
        "text-foreground text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5 p-2.5 text-xs border-r border-foreground/10",
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
        " align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5 p-2.5 text-xs border-r border-foreground/10",

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
      className={cn("text-muted-foreground mt-4 text-sm", className)}
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
