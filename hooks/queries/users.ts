import { list } from "@/lib/api/user";
import { queryKeys } from "@/lib/constant/queryKeys";
import { ClerkToken, UserFilter } from "@/lib/types";
import { queryOptions } from "@tanstack/react-query";

export function userListQueryOption(params: UserFilter, token: ClerkToken) {
  return queryOptions({
    queryKey: queryKeys.user.list(params),
    queryFn: () => list(params, token),
    enabled: !!token,
  });
}
