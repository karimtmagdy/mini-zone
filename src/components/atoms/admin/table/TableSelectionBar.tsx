import * as React from "react";
import { Icon } from "@/assets/icon/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

interface TableBatchAction {
  label: string;
  icon: React.ReactNode;
  onClick: (rows: any[]) => void;
  variant?: "default" | "outline" | "destructive" | "secondary" | "ghost";
}

interface TableSelectionBarProps {
  table: Table<any>;
  actions: TableBatchAction[];
}

export function TableSelectionBar({ table, actions }: TableSelectionBarProps) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  if (selectedCount === 0) return null;

  return (
    <div className="animate-in fade-in zoom-in slide-in-from-bottom-4 fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 duration-300">
      <div className="bg-background/95 flex items-center gap-3 rounded-xl border p-2 shadow-2xl backdrop-blur-md">
        {/* Selected Count & Clear */}
        <Badge className="flex items-center gap-2 pr-1 pl-2" variant="outline">
          <Badge className="text-sm font-medium">
            <span className="font-mono">{selectedCount}</span> selected
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-destructive/10 hover:text-destructive size-7"
            onClick={() => table.resetRowSelection()}
          >
            <Icon.XIcon />
          </Button>
        </Badge>

        <Separator orientation="vertical" className="bg-border h-8 w-px" />

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 px-1">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "secondary"}
              size="sm"
              className={cn(
                action.variant === "destructive" &&
                  "hover:bg-destructive hover:text-destructive-foreground",
              )}
              onClick={() =>
                action.onClick(selectedRows.map((r) => r.original))
              }
            >
              <div className="size-4 opacity-70">{action.icon}</div>
              <span className="text-xs font-semibold">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
