"use client";
import { DataTable } from "@/components/common/DataTable";
import {
  FilterContainer,
  Layout,
  LayoutBreadCrumb,
  LayoutHeader,
} from "@/components/layouts";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserList } from "@/hooks/queries/users";
import useIsMasterAdmin from "@/hooks/useIsAdmin";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "@/lib/constant";
import { User, UserFilter } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DebounceInput } from "react-debounce-input";

export default function UserPage() {
  const isMasterAdmin = useIsMasterAdmin();

  const [filterParams, setFilterParams] = useState<UserFilter>({
    email: "",
    page: DEFAULT_PAGE_NUMBER,
    limit: DEFAULT_PAGE_SIZE,
    membership: "",
  });

  const { data, ...rest } = useUserList(filterParams);

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        cell: (info) => info.getValue(),
      },

      {
        header: "Name",
        cell: ({ row }) => (
          <p className="flex flex-col">
            <span className="text-sm font-semibold">
              {row.original.firstName} {row.original.lastName}
            </span>
            {isMasterAdmin && <span>{row.original.email}</span>}
          </p>
        ),
      },
      {
        accessorKey: "clerkId",
        header: "ClerkId",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "membership.name",
        header: "Membership",
        cell: (info) => {
          const value = info.getValue() as string;
          return value.replace("_", " ");
        },
      },
      {
        accessorKey: "balance",
        header: "Betzy coin",
        cell: (info) => `$${info.getValue()}`,
      },
      {
        accessorKey: "xp",
        header: "Xp",
        cell: (info) => `${info.getValue()}xp`,
      },
      {
        accessorKey: "referralCode",
        header: "Referral Id",
        cell: (info) => `${info.getValue()}xp`,
        enablePinning: true,
      },
      {
        header: "Action",
        enableHiding: false,
        cell: ({ row }) => {
          const data = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Copy User&apos;s clerk Id</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(data.clerkId)}
                >
                  Copy User&apos;s Clerk ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/admin/users/${data.id}/referrals`}>
                    View User&apos;s Referrals
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>View User&apos;s Game Tag</DropdownMenuItem>
                <DropdownMenuItem>View User&apos;s Task</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [isMasterAdmin]
  );

  return (
    <Layout>
      <LayoutBreadCrumb
        crumbs={[
          {
            name: "User",
            href: "/admin/users",
            isCurrentPage: true,
          },
        ]}
      />
      <div className="flex flex-col gap-2">
        <LayoutHeader title="Users" description="View and manage every user." />
        <FilterContainer>
          <div className="flex flex-col gap-3">
            <Label className="text-sm">Email Address</Label>
            <DebounceInput
              debounceTimeout={800}
              value={filterParams.email}
              onChange={(event) =>
                setFilterParams((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
              placeholder="Enter email address"
              element={Input}
              size="sm"
            />
          </div>
        </FilterContainer>
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
