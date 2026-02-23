import * as React from "react";
import { Icon } from "@/assets/icon/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchToolbar } from "@/components/atoms/admin/SearchToolbar";
import type { Table } from "@tanstack/react-table";

interface SortOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface TableSearchSortBarProps {
  query: any;
  table: Table<any>;
  searchPlaceholder?: string;
  searchColumn?: string;
  sortOptions?: SortOption[];
  onExport?: () => void;
}

const DEFAULT_SORT_OPTIONS: SortOption[] = [
  {
    value: "updatedAt",
    label: "Latest Update",
    icon: <Icon.HistoryIcon className="opacity-60" />,
  },
  {
    value: "name",
    label: "Name (A-Z)",
    icon: <Icon.TypeIcon className="opacity-60" />,
  },
  {
    value: "createdAt",
    label: "Creation Date",
    icon: <Icon.CalendarIcon className="opacity-60" />,
  },
];
export function TableSearchSortBar({
  query,
  table,
  searchPlaceholder,
  searchColumn = "name",
  sortOptions = DEFAULT_SORT_OPTIONS,
  onExport,
}: TableSearchSortBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-sm flex-1">
        <SearchToolbar
          name={searchColumn}
          query={query}
          table={table}
          placeholder={searchPlaceholder}
        />
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Icon.FilterIcon />
              <span>Sort & Filters</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Sort Results By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={table.getState().sorting?.[0]?.id || sortOptions[0]?.value}
              onValueChange={(val) => {
                table.setSorting([{ id: val, desc: true }]);
              }}
            >
              {/* {sortOptions.map((opt) => (
                <DropdownMenuRadioItem
                  key={opt.value}
                  value={opt.value}
                  className="gap-2"
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </DropdownMenuRadioItem>
              ))} */}
              <DropdownMenuRadioItem value="updatedAt">
                <Icon.HistoryIcon className="opacity-60" />
                <span>Latest Update</span>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="name">
                <Icon.TypeIcon className="opacity-60" />
                <span>Name (A-Z)</span>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="createdAt">
                <Icon.CalendarIcon className="opacity-60" />
                <span>Creation Date</span>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive gap-2"
              onClick={() => {
                table.resetColumnFilters();
                // نستخدم أول خيار ترتيب كافتراضي عند التصفير
                table.setSorting([
                  { id: sortOptions[0]?.value || "updatedAt", desc: true },
                ]);
              }}
            >
              <Icon.RefreshCwIcon className="size-3.5" />
              <span>Reset to Default</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {onExport && (
          <Button variant="outline" onClick={onExport}>
            <Icon.DownloadIcon />
            <span className="hidden sm:inline">Export</span>
          </Button>
        )}
      </div>
    </div>
  );
}
