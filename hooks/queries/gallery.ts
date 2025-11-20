import {
  createManyImage,
  deleteImage,
  getGalleryImages,
} from "@/lib/api/gallery";
import { queryKeys } from "@/lib/constant/queryKeys";
import { ClerkToken, PaginationFilter } from "@/lib/types";
import { queryOptions, useMutation } from "@tanstack/react-query";

export function getAllGalleryImagesOption(
  params: PaginationFilter,
  token: ClerkToken
) {
  return queryOptions({
    queryKey: queryKeys.gallery.findAll(params),
    queryFn: () => getGalleryImages(params, token),
    enabled: !!token,
  });
}

export function useCreateManyImages(token: ClerkToken) {
  return useMutation({
    mutationFn: (data: FormData) => createManyImage(data, token),
    meta: {
      invalidateQueries: queryKeys.gallery.all,
    },
  });
}
export function useDeleteImage(id: string, token: ClerkToken) {
  return useMutation({
    mutationFn: () => deleteImage(id, token),
    meta: {
      invalidateQueries: queryKeys.gallery.all,
    },
  });
}
