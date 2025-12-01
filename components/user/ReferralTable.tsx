"use client";
import { useReferral } from "@/hooks/queries/referral";
import useIsMasterAdmin from "@/hooks/useIsAdmin";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "@/lib/constant";
import { FindAllReferralFilter, Referrals } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { DataTable } from "../common/DataTable";

export default function ReferralTable() {
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
    <>
      <DataTable
        columns={columns}
        data={data}
        filterState={filterParams}
        setFilterParams={setFilterParams}
        {...rest}
      />
    </>
  );
}
