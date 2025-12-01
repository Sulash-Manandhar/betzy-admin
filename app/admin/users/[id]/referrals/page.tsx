"use client";
import { DataTable } from "@/components/common/DataTable";
import { Layout, LayoutBreadCrumb, LayoutHeader } from "@/components/layouts";
import { useReferral } from "@/hooks/queries/referral";
import useIsMasterAdmin from "@/hooks/useIsAdmin";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "@/lib/constant";
import { FindAllReferralFilter, Referrals } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function ReferralsPage() {
  const isMasterAdmin = useIsMasterAdmin();

  const { id } = useParams<{ id: string }>();

  const [filterParams, setFilterParams] = useState<FindAllReferralFilter>({
    referralId: Number(id),
    page: DEFAULT_PAGE_NUMBER,
    limit: DEFAULT_PAGE_SIZE,
  });

  const { data, ...rest } = useReferral(filterParams);

  const columns = useMemo(() => {
    const columns: ColumnDef<Referrals>[] = [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => row.getValue("id"),
      },
      {
        accessorKey: "referredBy",
        header: "Referred By",
        cell: ({ row }) => (
          <p className="flex flex-col">
            <span className="text-sm font-semibold">
              {row.original.referredUser.firstName}{" "}
              {row.original.referredUser.lastName}
            </span>
            {isMasterAdmin && <span>{row.original.referredUser.email}</span>}
          </p>
        ),
      },
      {
        accessorKey: "referredUser",
        header: "Referred User",
        cell: ({ row }) => (
          <p className="flex flex-col">
            <span className="text-sm font-semibold">
              {row.original.referrer.firstName} {row.original.referrer.lastName}
            </span>
            {isMasterAdmin && <span>{row.original.referrer.email}</span>}
          </p>
        ),
      },
      {
        accessorKey: "bonusAmount",
        header: "Bonus Amount",
        cell: ({ row }) => row.getValue("bonusAmount") ?? 0,
      },
      {
        accessorKey: "bonusAwarded",
        header: "Bonus Awarded",
        cell: ({ row }) => (row.getValue("bonusAwarded") ? "Yes" : "No"),
      },
    ];
    return columns;
  }, [isMasterAdmin]);

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
