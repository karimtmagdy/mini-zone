import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StatusOption {
  value: string;
  label: string;
}

interface TableStatusTabsProps {
  value: string;
  onValueChange: (value: string) => void;
  options: StatusOption[];
}

export function TableStatusTabs({
  value,
  onValueChange,
  options,
}: TableStatusTabsProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange}>
      <TabsList>
        {options.map((option) => (
          <TabsTrigger key={option.value} value={option.value}>
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
