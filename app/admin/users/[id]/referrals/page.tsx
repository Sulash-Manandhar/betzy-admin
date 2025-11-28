"use client";
import { DataTable } from "@/components/common/DataTable";
import { Layout, LayoutBreadCrumb, LayoutHeader } from "@/components/layouts";
import { useReferral } from "@/hooks/queries/referral";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "@/lib/constant";
import {
  FindAllReferralFilter,
  PaginatedResponse,
  PaginationFilter,
  UserFilter,
} from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";

export default function Referrals() {
  const [filterParams, setFilterParams] = useState<FindAllReferralFilter>({
    referralId: 1,
    page: DEFAULT_PAGE_NUMBER,
    limit: DEFAULT_PAGE_SIZE,
  });

  const { data, ...rest } = useReferral(filterParams);

  console.log(data);

  const columns = useMemo(() => {
    const columns: ColumnDef<{ name: string }>[] = [];
    return columns;
  }, []);
  return (
    <Layout>
      <LayoutBreadCrumb
        crumbs={[
          {
            name: "User",
            href: "/admin/users",
          },
          {
            name: "User's Referrals",
            href: {
              pathname: "/admin/users/4/referrals",
            },
            isCurrentPage: true,
          },
        ]}
      />
      <div className="flex flex-col gap-2">
        <LayoutHeader
          title="Users Referrals"
          description="View user's referrals."
        />
        {/* <DataTable
          columns={columns}
          data={[]}
          filterState={filterParams}
          setFilterParams={setFilterParams}
        /> */}
      </div>
    </Layout>
  );
}
