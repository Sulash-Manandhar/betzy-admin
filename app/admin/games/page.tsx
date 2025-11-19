"use client";

import { DataTable } from "@/components/common/DataTable";
import {
  TableBreadCrumb,
  TableHeader,
  TableLayout,
} from "@/components/layouts/TableLayout";
import { Switch } from "@/components/ui/switch";
import { useAuthToken } from "@/context/AuthTokenProvider";
import { listGameOptions } from "@/hooks/queries/game";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "@/lib/constant";
import { Game, GameFilter } from "@/lib/types";
import { getImage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { UrlObject } from "url";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

function GamesPage() {
  const { token } = useAuthToken();
  const [filterParams, setFilterParams] = useState<GameFilter>({
    name: "",
    description: "",
    page: DEFAULT_PAGE_NUMBER,
    limit: DEFAULT_PAGE_SIZE,
  });
  const { data, ...rest } = useQuery(listGameOptions(filterParams, token));

  const columns: ColumnDef<Game>[] = useMemo(() => {
    const columns: ColumnDef<Game>[] = [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex flex-row items-center gap-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={getImage(row.original.image?.url)}
                alt={row.original.name}
                fill
                objectFit="cover"
              />
            </div>
            <span className="font-semibold">{row.original.name}</span>
          </div>
        ),
      },
      {
        accessorKey: "is_featured",
        header: "Is Featured",
        cell: ({ row }) => (
          <Switch
            id="is_featured"
            checked={row.original.is_featured}
            disabled
          />
        ),
      },
      {
        accessorKey: "game_link",
        header: "Game Link",
        cell: (info) => (
          <Link target="_blank" href={info.getValue() as UrlObject}>
            Visit Link
          </Link>
        ),
      },
      {
        header: "Action",
        enableHiding: false,
        cell: ({ row }) => {
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
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    target="_blank"
                    href={row.original.game_link as unknown as UrlObject}
                  >
                    Visit Link
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
    return columns;
  }, []);

  return (
    <TableLayout>
      <TableBreadCrumb
        crumbs={[{ name: "Games", link: "/admin/games", isCurrentPage: true }]}
      />
      <div className="flex flex-col gap-2">
        <TableHeader title="Games" description="View and manage every games." />
      </div>

      <DataTable
        columns={columns}
        data={data}
        filterState={filterParams}
        setFilterParams={setFilterParams}
        {...rest}
      />
    </TableLayout>
  );
}

export default GamesPage;
