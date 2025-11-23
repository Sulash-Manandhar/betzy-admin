"use client";
import AddImage from "@/components/gallery/AddImage";
import GalleryListItem from "@/components/gallery/GalleryListItem";
import { Layout, LayoutBreadCrumb, LayoutHeader } from "@/components/layouts";
import { Spinner } from "@/components/ui/spinner";
import { useGalleryImage } from "@/hooks/queries/gallery";
import { DEFAULT_PAGE_NUMBER } from "@/lib/constant";
import { PaginationFilter } from "@/lib/types";
import { PropsWithChildren, useState } from "react";

export default function GalleryPage() {
  const [filterParams] = useState<PaginationFilter>({
    page: DEFAULT_PAGE_NUMBER,
    limit: 300,
  });

  const { data, isLoading, isError } = useGalleryImage(filterParams);

  return (
    <Layout>
      <LayoutBreadCrumb
        crumbs={[
          {
            name: "Gallery",
            href: "/admin/gallery",
            isCurrentPage: true,
          },
        ]}
      />
      <div className="flex flex-col gap-4">
        <LayoutHeader title="Gallery" description="View and manage images." />
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
    </Layout>
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
