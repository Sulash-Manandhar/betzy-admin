import { getAllMembership } from "@/lib/api/membership";
import { queryKeys } from "@/lib/constant/queryKeys";
import { PaginationFilter } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export function useMemberList(params: PaginationFilter) {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: queryKeys.membership.findAll(params),
    queryFn: async () => {
      const token = await getToken();
      return getAllMembership(params, token);
    },
  });
}
