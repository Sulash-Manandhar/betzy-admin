import { list } from "@/lib/api/user";
import { queryKeys } from "@/lib/constant/queryKeys";
import { ClerkToken } from "@/lib/types";
import { queryOptions } from "@tanstack/react-query";

export function userListQueryOption(
  params: Record<string, string>,
  token: ClerkToken
) {
  const userList = queryOptions({
    queryKey: queryKeys.user.list(),
    queryFn: async () => {
      const response = await list(params, token);
      return response;
    },
  });

  return userList;
}
