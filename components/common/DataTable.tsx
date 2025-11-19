"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PAGE_SIZES } from "@/lib/constant";
import { PaginatedResponse, PaginationFilter } from "@/lib/types";
import {
  type ColumnDef,
  type PaginationState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";

interface DataTableProps<TData, TFilter> {
  isLoading: boolean;
  error: Error | null;
  data: PaginatedResponse<TData> | undefined;
  columns: ColumnDef<TData>[];
  filterState: TFilter;
  setFilterParams: Dispatch<SetStateAction<TFilter>>;
}

export function DataTable<TData, TFilter extends PaginationFilter>({
  columns,
  data,
  isLoading,
  error,
  filterState,
  setFilterParams,
}: DataTableProps<TData, TFilter>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: filterState.page ? filterState.page - 1 : 0,
    pageSize: filterState.limit,
  });

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data: data?.list || [],
    columns,
    rowCount: data?.meta.totalPages || 0,
    state: {
      pagination,
      columnVisibility,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
  });

  const onPaginationChange = useEffectEvent(
    (currentPagination: PaginationState) => {
      setFilterParams((prev) => ({
        ...prev,
        page: currentPagination.pageIndex + 1,
        limit: currentPagination.pageSize,
      }));
    }
  );

  useEffect(() => {
    onPaginationChange(pagination);
  }, [pagination]);

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Hide Column <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <Table className="rounded-md border overflow-hidden bg-white w-full">
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
          <p className="text-sm text-muted-foreground flex justify-end">
            Page {pagination.pageIndex + 1} of {data?.meta?.totalPages || 1} (
            {data?.meta?.totalCount || 0} total)
          </p>
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

type RenderTableBodyProps = {
  isLoading: boolean;
  error: Error | null;
  columnLength: number;
  hasNoResult: boolean;
  children: ReactElement[];
};

function RenderTableBody({
  isLoading,
  columnLength,
  error,
  hasNoResult,
  children,
}: RenderTableBodyProps) {
  if (isLoading) {
    return Array.from({ length: 20 }).map((_, index) => (
      <TableRow key={index}>
        <TableCell colSpan={columnLength} className="h-4 text-center">
          <Skeleton className="h-5 w-full rounded-sm" />
        </TableCell>
      </TableRow>
    ));
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
