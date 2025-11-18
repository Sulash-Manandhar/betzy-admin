"use client";
import { DataTable } from "@/components/common/DataTable";
import {
  TableBreadCrumb,
  TableHeader,
  TableLayout,
} from "@/components/layouts/TableLayout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthToken } from "@/context/AuthTokenProvider";
import { userListQueryOption } from "@/hooks/queries/users";
import { User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "clerkId",
    header: "ClerkId",
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email Address",
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
    header: "Referral Code",
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.id.toString())}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function UserPage() {
  const { token } = useAuthToken();

  const { data, ...rest } = useQuery(userListQueryOption({}, token));

  return (
    <TableLayout>
      <TableBreadCrumb
        crumbs={[
          {
            name: "User",
            link: "/admin/users",
            isCurrentPage: true,
          },
        ]}
      />
      <div>
        <TableHeader title="Users" description="View and manage every user." />
        <DataTable columns={columns} data={data} {...rest} />
      </div>
    </TableLayout>
  );
}
