import { getGalleryImages } from "@/lib/api/gallery";
import { queryKeys } from "@/lib/constant/queryKeys";
import { ClerkToken, PaginationFilter } from "@/lib/types";
import { queryOptions } from "@tanstack/react-query";

export function getAllGalleryImagesOption(
  params: PaginationFilter,
  token: ClerkToken
) {
  return queryOptions({
    queryKey: queryKeys.gallery.list(params),
    queryFn: () => getGalleryImages(params, token),
    enabled: !!token,
  });
}
