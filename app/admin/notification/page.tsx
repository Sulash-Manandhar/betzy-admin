"use client";
import { DataTable } from "@/components/common/DataTable";
import { Layout, LayoutBreadCrumb, LayoutHeader } from "@/components/layouts";
import { useNotificationList } from "@/hooks/queries/notification";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "@/lib/constant";
import { Notification, PaginationFilter } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

export default function NotificationPage() {
  const [filterParams, setFilterParams] = useState<PaginationFilter>({
    page: DEFAULT_PAGE_NUMBER,
    limit: DEFAULT_PAGE_SIZE,
  });

  const { data, ...rest } = useNotificationList(filterParams);

  const columns = useMemo(() => {
    const columns: ColumnDef<Notification>[] = [
      {
        header: "Initiated by",
        cell: (info) => {
          const { firstName, lastName, email } = info.row.original.user;
          return (
            <p className="flex flex-col ">
              {firstName} {lastName}
              <span>{email}</span>
            </p>
          );
        },
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "description",
        header: "Description",
        cell: (info) => info.getValue() ?? "-",
      },
    ];
    return columns;
  }, []);

  return (
    <Layout>
      <LayoutBreadCrumb
        crumbs={[
          {
            name: "Notification",
            href: "/admin/notification",
            isCurrentPage: true,
          },
        ]}
      />
      <div className="flex flex-col gap-2">
        <LayoutHeader title="Notification" description="View all membership." />
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
