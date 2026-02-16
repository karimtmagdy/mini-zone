import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  PageHeadActions,
  PageHeadRow,
  PageHeadTitle,
  PageHeadDescription,
  PageHead,
} from "@/components/ui/head-page";
import { Icon } from "@/assets/icon/icons";
import { useGetCategories } from "@/hooks/use-category";
import { useTable } from "@/hooks/use-table";
import { categoryColumns } from "./CategoryColumns";
import { DataGlobalTable } from "@/components/atoms/admin/table";
import SearchToolbar from "@/components/atoms/admin/SearchToolbar";

export default function CategoriesPage() {
  const [{ pageIndex, pageSize } /* , setPagination */] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useGetCategories({
    page: pageIndex + 1,
    limit: pageSize,
  });

  const categoryData = React.useMemo(() => {
    const res = query.data;
    if (res && res.status === "success") {
      return (res as any).data;
    }
    return [];
  }, [query.data]);

  const columnsTable = React.useMemo(() => categoryColumns, []);

  const table = useTable({
    data: categoryData,
    columns: columnsTable,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
      // search
    },
  });
  return (
    <div className="flex flex-col gap-6">
      <CategoriesPageToolbar />
      <CategoriesTable table={table} query={query} />
    </div>
  );
}

function CategoriesPageToolbar() {
  return (
    <PageHead>
      <PageHeadRow>
        <PageHeadActions align="start" responsive="col">
          <PageHeadTitle>Categories</PageHeadTitle>
          <PageHeadDescription>
            Organize your products into logical groups and hierarchies.
          </PageHeadDescription>
        </PageHeadActions>
        <PageHeadActions  responsive='col'>
          <Button >
            <Icon.FolderPlusIcon />
            Add Category
          </Button>
        </PageHeadActions>
      </PageHeadRow>
      <PageHeadRow>
        <SearchToolbar name="name" />
      </PageHeadRow>
    </PageHead>
  );
}
function CategoriesTable({ table, query }: { table: any; query: any }) {
  return <DataGlobalTable table={table} name="categories" query={query} />;
}
