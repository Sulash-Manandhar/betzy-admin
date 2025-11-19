import { listGame } from "@/lib/api/game";
import { queryKeys } from "@/lib/constant/queryKeys";
import { ClerkToken, GameFilter } from "@/lib/types";
import { queryOptions } from "@tanstack/react-query";

export function listGameOptions(params: GameFilter, token: ClerkToken) {
  return queryOptions({
    queryKey: queryKeys.game.list(params),
    queryFn: () => listGame(params, token),
    enabled: !!token,
  });
}
