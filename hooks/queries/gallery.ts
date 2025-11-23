import {
  createManyImage,
  deleteImage,
  getGalleryImages,
} from "@/lib/api/gallery";
import { queryKeys } from "@/lib/constant/queryKeys";
import { PaginationFilter } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGalleryImage(params: PaginationFilter) {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: queryKeys.gallery.findAll(params),
    queryFn: async () => {
      const token = await getToken();
      return getGalleryImages(params, token);
    },
  });
}

export function useCreateManyImages() {
  const { getToken } = useAuth();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const token = await getToken();
      return createManyImage(data, token);
    },
    meta: {
      invalidateQueries: queryKeys.gallery.all,
    },
  });
}
export function useDeleteImage(id: string) {
  const { getToken } = useAuth();
  return useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return deleteImage(id, token);
    },
    meta: {
      invalidateQueries: queryKeys.gallery.all,
    },
  });
}
