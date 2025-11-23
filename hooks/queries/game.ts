import { createGame, findAllGame, findGame, updateGame } from "@/lib/api/game";
import { queryKeys } from "@/lib/constant/queryKeys";
import { CreateGameSchema, GameFilter } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useFindAllGame(params: GameFilter) {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: queryKeys.game.findAll(params),
    queryFn: async () => {
      const token = await getToken();
      return findAllGame(params, token);
    },
  });
}

export function useCreateGame() {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (data: CreateGameSchema) => {
      const token = await getToken();
      return createGame(data, token);
    },
    meta: {
      invalidateQueries: queryKeys.game.all,
    },
  });
}
export function useUpdateGame() {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: CreateGameSchema;
    }) => {
      const token = await getToken();
      return updateGame(id, data, token);
    },
    meta: {
      invalidateQueries: queryKeys.game.all,
    },
  });
}

export function useFindGame(id: string) {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: queryKeys.game.findOne(id),
    queryFn: async () => {
      const token = await getToken();
      return findGame(id, token);
    },
  });
}
