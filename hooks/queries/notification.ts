import { notificationList } from "@/lib/api/notification";
import { queryKeys } from "@/lib/constant/queryKeys";
import { PaginationFilter } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export function useNotificationList(params: PaginationFilter) {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: queryKeys.notification.findAll(),
    queryFn: async () => {
      const token = await getToken();
      return notificationList(params, token);
    },
  });
}
