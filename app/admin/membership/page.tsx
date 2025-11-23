"use client";
import { DataTable } from "@/components/common/DataTable";
import { Layout, LayoutBreadCrumb, LayoutHeader } from "@/components/layouts";
import { useMemberList } from "@/hooks/queries/membership";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "@/lib/constant";
import { Membership, PaginationFilter } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

export default function MembershipPage() {
  const [filterParams, setFilterParams] = useState<PaginationFilter>({
    page: DEFAULT_PAGE_NUMBER,
    limit: DEFAULT_PAGE_SIZE,
  });

  const { data, ...rest } = useMemberList(filterParams);

  const columns = useMemo(() => {
    const columns: ColumnDef<Membership>[] = [
      {
        accessorKey: "name",
        header: "Membership Name",
        cell: (info) => {
          const value = info.getValue() as string;
          return value.replace("_", " ");
        },
      },
      {
        accessorKey: "ordering",
        header: "Ordering",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "pointsRequired",
        header: "Points Required",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "bonus",
        header: "Bonus",
        cell: (info) => `$${info.getValue()}`,
      },
    ];
    return columns;
  }, []);

  return (
    <Layout>
      <LayoutBreadCrumb
        crumbs={[
          {
            name: "Membership",
            href: "/admin/membership",
            isCurrentPage: true,
          },
        ]}
      />
      <div className="flex flex-col gap-2">
        <LayoutHeader title="Membership" description="View all membership." />
        <DataTable
          columns={columns}
          data={data}
          filterState={filterParams}
          setFilterParams={setFilterParams}
          {...rest}
        />
      </div>
    </Layout>
  );
}
