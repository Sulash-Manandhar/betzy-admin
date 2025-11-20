"use client";
import { DataTable } from "@/components/common/DataTable";
import { LayoutBreadCrumb, LayoutHeader, Layout } from "@/components/layouts";
import { useAuthToken } from "@/context/AuthTokenProvider";
import { notificationListOption } from "@/hooks/queries/notification";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "@/lib/constant";
import { Notification, PaginationFilter } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

export default function NotificationPage() {
  const { token } = useAuthToken();
  const [filterParams, setFilterParams] = useState<PaginationFilter>({
    page: DEFAULT_PAGE_NUMBER,
    limit: DEFAULT_PAGE_SIZE,
  });

  const { data, ...rest } = useQuery(
    notificationListOption(filterParams, token)
  );

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
            link: "/admin/notification",
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
