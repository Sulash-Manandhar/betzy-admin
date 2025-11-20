import { getAllMembership } from "@/lib/api/membership";
import { queryKeys } from "@/lib/constant/queryKeys";
import { ClerkToken, PaginationFilter } from "@/lib/types";
import { queryOptions } from "@tanstack/react-query";

export function membershipListOption(
  params: PaginationFilter,
  token: ClerkToken
) {
  return queryOptions({
    queryKey: queryKeys.membership.findAll(params),
    queryFn: () => getAllMembership(params, token),
    enabled: !!token,
  });
}
