"use client";

import { DataTable } from "@/components/common/DataTable";
import { Layout, LayoutBreadCrumb, LayoutHeader } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useFindAllGame } from "@/hooks/queries/game";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "@/lib/constant";
import { Game, GameFilter } from "@/lib/types";
import { imageLoader } from "@/lib/utils";
import { FallBackImage } from "@/public/images";
import { ColumnDef } from "@tanstack/react-table";
import {
  Edit2,
  ExternalLink,
  Link2,
  Link2Off,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { UrlObject } from "url";

function GamesPage() {
  const [filterParams, setFilterParams] = useState<GameFilter>({
    name: "",
    description: "",
    page: DEFAULT_PAGE_NUMBER,
    limit: DEFAULT_PAGE_SIZE,
  });

  const { data, ...rest } = useFindAllGame(filterParams);

  const columns: ColumnDef<Game>[] = useMemo(() => {
    const columns: ColumnDef<Game>[] = [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          const { image, name } = row.original;
          return (
            <div className="flex flex-row items-center gap-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                {image?.url ? (
                  <Image
                    src={image.url}
                    alt={name}
                    fill
                    objectFit="cover"
                    loader={imageLoader}
                  />
                ) : (
                  <Image
                    src={FallBackImage}
                    alt={name}
                    fill
                    objectFit="cover"
                  />
                )}
              </div>
              <span className="font-semibold">{name}</span>
            </div>
          );
        },
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
        accessorKey: "is_active",
        header: "Active",
        cell: ({ row }) => (
          <Switch
            id="is_featured"
            checked={row.original.is_featured}
            disabled
          />
        ),
      },
      {
        accessorKey: "gameType",
        header: "Type",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "game_link",
        header: "Game Link",
        cell: (info) => {
          if (info.getValue()) {
            return (
              <Link target="_blank" href={info.getValue() as UrlObject}>
                <Link2 className="size-5 stroke-green-600" />
              </Link>
            );
          }
          return <Link2Off className="size-5 stroke-gray-400/80" />;
        },
      },
      {
        accessorKey: "description",
        header: "Game Link",
        cell: (info) => {
          if (info.getValue()) {
            return (
              <p className="truncate max-w-[50ch]">
                {info.getValue() as string}
              </p>
            );
          }
          return <p>-</p>;
        },
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
                <DropdownMenuItem asChild>
                  <Link href={`/admin/games/edit/${row.original.id}`}>
                    <Edit2 className="size-4" /> Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="size-4" />
                  Delete
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
    <Layout>
      <LayoutBreadCrumb
        crumbs={[{ name: "Games", href: "/admin/games", isCurrentPage: true }]}
      />
      <div className="flex flex-col gap-2">
        <LayoutHeader title="Games" description="View and manage every games.">
          <Button asChild>
            <Link href="/admin/games/add">Add Game</Link>
          </Button>
        </LayoutHeader>
      </div>

      <DataTable
        columns={columns}
        data={data}
        filterState={filterParams}
        setFilterParams={setFilterParams}
        {...rest}
      />
    </Layout>
  );
}

export default GamesPage;
