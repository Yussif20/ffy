"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableColumnItem from "./SortableColumnItem";
import type { ColumnDef } from "@/hooks/useColumnCustomization";

type Props = {
  columns: ColumnDef[];
  visibility: Record<string, boolean>;
  order: string[];
  orderedVisibleKeys: string[];
  toggleVisibility: (key: string) => void;
  setAllVisibility: (visible: boolean) => void;
  reorder: (activeKey: string, overKey: string) => void;
  resetToDefaults: () => void;
  t: (key: string) => string;
};

export default function CustomizeColumnsDialog({
  columns,
  visibility,
  orderedVisibleKeys,
  toggleVisibility,
  setAllVisibility,
  reorder,
  resetToDefaults,
  t,
}: Props) {
  const [open, setOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorder(String(active.id), String(over.id));
    }
  }

  const allChecked = useMemo(
    () => columns.every((c) => visibility[c.key]),
    [columns, visibility],
  );

  function handleSelectAll() {
    setAllVisibility(!allChecked);
  }

  const columnMap = new Map(columns.map((c) => [c.key, c]));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          {t("customize")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-2xl p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
          <DialogTitle className="text-xl font-bold">
            {t("customizeColumns")}
          </DialogTitle>
        </DialogHeader>

        {/* Body - two columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/50 min-h-[300px] max-h-[60vh]">
          {/* Left: show/hide checkboxes */}
          <div className="px-6 py-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                {t("showHide")}
              </h4>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                {allChecked ? t("deselectAll") : t("selectAll")}
              </button>
            </div>
            <div className="space-y-1 flex-1 overflow-y-auto -mx-2 px-2 scrollbar-thin">
              {columns.map((col) => (
                <label
                  key={col.key}
                  className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2.5 hover:bg-muted/40 transition-colors group"
                >
                  <Checkbox
                    checked={visibility[col.key] ?? true}
                    onCheckedChange={() => toggleVisibility(col.key)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span className="text-sm font-medium group-hover:text-foreground transition-colors">
                    {t(col.labelKey)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Right: reorder drag list */}
          <div className="px-6 py-5 flex flex-col">
            <h4 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-4">
              {t("reorder")}
            </h4>
            <div className="space-y-2 flex-1 overflow-y-auto -mx-1 px-1 scrollbar-thin">
              {orderedVisibleKeys.length === 0 ? (
                <p className="text-sm text-muted-foreground/60 text-center py-8">
                  {t("noColumnsSelected")}
                </p>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={orderedVisibleKeys}
                    strategy={verticalListSortingStrategy}
                  >
                    {orderedVisibleKeys.map((key) => {
                      const col = columnMap.get(key);
                      if (!col) return null;
                      return (
                        <SortableColumnItem
                          key={key}
                          id={key}
                          label={t(col.labelKey)}
                          onRemove={(k) => toggleVisibility(k)}
                        />
                      );
                    })}
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border/50 bg-muted/20">
          <Button
            variant="outline"
            size="sm"
            onClick={resetToDefaults}
            className="gap-2 text-primary border-primary/30 hover:bg-primary/10"
            linearClassName="rounded-lg"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {t("resetDefaults")}
          </Button>
          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button variant="ghost" size="sm">
                {t("cancel")}
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button size="sm">
                {t("apply")}
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
