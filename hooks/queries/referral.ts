import { findReferralByUserId } from "@/lib/api/referral";
import { queryKeys } from "@/lib/constant/queryKeys";
import { FindAllReferralFilter } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export function useReferral(params: FindAllReferralFilter) {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: queryKeys.referral.findAll(params),
    queryFn: async () => {
      const token = await getToken();
      return findReferralByUserId(params, token);
    },
  });
}
