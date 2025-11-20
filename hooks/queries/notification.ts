import { notificationList } from "@/lib/api/notification";
import { queryKeys } from "@/lib/constant/queryKeys";
import { ClerkToken, PaginationFilter } from "@/lib/types";
import { queryOptions } from "@tanstack/react-query";

export function notificationListOption(
  params: PaginationFilter,
  token: ClerkToken
) {
  return queryOptions({
    queryKey: queryKeys.notification.findAll(),
    queryFn: () => notificationList(params, token),
    enabled: !!token,
  });
}
