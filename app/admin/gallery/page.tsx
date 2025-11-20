"use client";
import AddImage from "@/components/gallery/AddImage";
import GalleryListItem from "@/components/gallery/GalleryListItem";
import {
  TableBreadCrumb,
  TableHeader,
  TableLayout,
} from "@/components/layouts/TableLayout";
import { Spinner } from "@/components/ui/spinner";
import { useAuthToken } from "@/context/AuthTokenProvider";
import { getAllGalleryImagesOption } from "@/hooks/queries/gallery";
import { DEFAULT_PAGE_NUMBER } from "@/lib/constant";
import { PaginationFilter } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";

export default function GalleryPage() {
  const { token } = useAuthToken();

  const [filterParams] = useState<PaginationFilter>({
    page: DEFAULT_PAGE_NUMBER,
    limit: 300,
  });

  const { data, isLoading, isError } = useQuery(
    getAllGalleryImagesOption(filterParams, token)
  );

  return (
    <TableLayout>
      <TableBreadCrumb
        crumbs={[
          {
            name: "Gallery",
            link: "/admin/gallery",
            isCurrentPage: true,
          },
        ]}
      />
      <div className="flex flex-col gap-4">
        <TableHeader title="Gallery" description="View and manage images." />
        <AddImage />
        <RenderGalleryBody
          hasNoImages={data?.list?.length === 0}
          isError={isError}
          isLoading={isLoading}
        >
          {data?.list.map((item) => (
            <GalleryListItem key={item.id} image={item} />
          ))}
        </RenderGalleryBody>
      </div>
    </TableLayout>
  );
}

type Props = {
  isLoading: boolean;
  isError: boolean;
  hasNoImages: boolean;
};
export function RenderGalleryBody({
  isLoading,
  isError,
  hasNoImages,
  children,
}: PropsWithChildren<Props>) {
  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h3>Something went wrong!</h3>
      </div>
    );
  }

  if (hasNoImages) {
    return (
      <div>
        <h3>Add images to preview.</h3>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-5  lg:grid-cols-3 lg xl:grid-cols-5 gap-4 xl:gap-2 p-2 py-4">
      {children}
    </div>
  );
}
