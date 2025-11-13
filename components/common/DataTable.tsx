"use client";
import { ReactElement, useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type PaginationState,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { DEFAULT_PAGE_SIZE, PAGE_SIZES } from "@/lib/constant";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  url: string;
  pageSize?: number;
  onFilter?: (filters: Record<string, string>) => void;
}

interface ApiResponse<TData> {
  data: TData[];
  total: number;
  pageCount: number;
}

type RenderTableBodyProps = {
  isLoading: boolean;
  error: Error | null;
  columnLength: number;
  hasNoResult: boolean;
  children: ReactElement[];
};
export function RenderTableBody({
  isLoading,
  columnLength,
  error,
  hasNoResult,
  children,
}: RenderTableBodyProps) {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={columnLength} className="h-24 text-center">
          Loading...
        </TableCell>
      </TableRow>
    );
  }

  if (error) {
    return (
      <TableRow>
        <TableCell
          colSpan={columnLength}
          className="h-24 text-center text-destructive"
        >
          Failed to load data
        </TableCell>
      </TableRow>
    );
  }

  if (hasNoResult) {
    return (
      <TableRow>
        <TableCell
          colSpan={columnLength}
          className="h-24 text-center text-muted-foreground"
        >
          No results found
        </TableCell>
      </TableRow>
    );
  }

  return children;
}

export function DataTable<TData extends Record<string, unknown>>({
  columns,
  url,
  pageSize = DEFAULT_PAGE_SIZE,
}: DataTableProps<TData>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const [filters, setFilters] = useState<Record<string, string>>({});

  const params = new URLSearchParams({
    page: (pagination.pageIndex + 1).toString(),
    pageSize: pagination.pageSize.toString(),
    ...filters,
  });

  const { data, error, isLoading } = useQuery<ApiResponse<TData>>({
    queryKey: [url, params.toString()],
    queryFn: async () => {
      const res = await fetch(`${url}?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // garbage collection time (formerly cacheTime)
  });

  const table = useReactTable({
    data: data?.data || [],
    columns,
    rowCount: data?.total || 0,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const handleClearFilters = () => {
    setFilters({});
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap gap-3">
          {Object.entries(filters).length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="h-10 bg-transparent"
            >
              Clear Filters
            </Button>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              Page {pagination.pageIndex + 1} of {data?.pageCount || 1} (
              {data?.total || 0} total)
            </>
          )}
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <RenderTableBody
              columnLength={columns.length}
              hasNoResult={table.getRowModel().rows.length === 0}
              isLoading={isLoading}
              error={error}
            >
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </RenderTableBody>
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            title="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            title="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            title="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            title="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
          >
            {PAGE_SIZES.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export type { DataTableProps, ApiResponse };
