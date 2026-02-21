import * as React from "react";
import { Icon } from "@/assets/icon/icons";
import { Button } from "@/components/ui/button";
import { PageHeadActions } from "@/components/ui/head-page";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import type { Table } from "@tanstack/react-table";

type QueryOptions<TData> = {
  query: {
    refetch: () => void;
    isFetching: boolean;
    isRefetching: boolean;
  };
  className?: string;
  name: string;
  table: Table<TData>;
  placeholder?: string;
};

export function SearchToolbar<TData>({
  name,
  query,
  className,
  table,
  placeholder,
}: QueryOptions<TData>) {
  const column = table?.getColumn(name);
  const initialValue = (column?.getFilterValue() as string) ?? "";
  const [value, setValue] = React.useState(initialValue);
  const debouncedValue = useDebounce(value, 200);
  const [isTyping, setIsTyping] = React.useState(false);

  // تحديث فلتر الجدول عند تغير القيمة (مع إضافة guard لمنع التكرار)
  React.useEffect(() => {
    const col = table?.getColumn(name);
    if (!col) return;

    if (col.getFilterValue() !== debouncedValue) {
      col.setFilterValue(debouncedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, name]);
  // ملاحظة: تم تثبيت عدد التبعيات لمنع خطأ "changed size between renders"

  // Update local state if the table filter changes externally (e.g. reset)
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    if (!value) {
      setIsTyping(false);
      return;
    }
    setIsTyping(true);
    const timeout = setTimeout(() => setIsTyping(false), 400);
    return () => clearTimeout(timeout);
  }, [value]);
  return (
    <PageHeadActions responsive="row">
      <InputGroup className="w-full @lg:w-sm">
        <InputGroupAddon>
          <InputGroupButton aria-label="search">
            {isTyping ? (
              <Icon.Loader2Icon className={cn("animate-spin")} />
            ) : (
              <Icon.SearchIcon />
            )}
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupInput
          placeholder={placeholder || `Filter by ${name}...`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </InputGroup>
      <Button
        size="icon"
        variant="outline"
        className={cn("border-dashed", className)}
        disabled={query.isFetching}
        onClick={() => query.refetch()}
        aria-label="Refresh data"
      >
        <Icon.RefreshCwIcon
          className={cn(query.isRefetching && "animate-spin")}
        />
      </Button>
    </PageHeadActions>
  );
}
// const filteredCategories = categories.filter((category) =>
//   category.name.toLowerCase().includes(search.toLowerCase()),
// );
