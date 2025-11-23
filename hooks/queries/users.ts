import { list } from "@/lib/api/user";
import { queryKeys } from "@/lib/constant/queryKeys";
import { UserFilter } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export function useUserList(params: UserFilter) {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: queryKeys.user.findAll(params),
    queryFn: async () => {
      const token = await getToken();
      return list(params, token);
    },
  });
}
