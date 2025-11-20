import { createGame, findAllGame } from "@/lib/api/game";
import { queryKeys } from "@/lib/constant/queryKeys";
import { ClerkToken, CreateGameSchema, GameFilter } from "@/lib/types";
import { queryOptions, useMutation } from "@tanstack/react-query";

export function findAllGameQueryOption(params: GameFilter, token: ClerkToken) {
  return queryOptions({
    queryKey: queryKeys.game.list(params),
    queryFn: () => findAllGame(params, token),
    enabled: !!token,
  });
}

export function useCreateGame(token: ClerkToken) {
  return useMutation({
    mutationFn: (data: CreateGameSchema) => createGame(data, token),
    meta: {
      invalidateQueries: queryKeys.game.all,
    },
  });
}
