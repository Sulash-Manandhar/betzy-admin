import { GameFilter, PaginationFilter, UserFilter } from "../types";

export const queryKeys = {
  user: {
    all: ["user"] as const,
    list: (filters: UserFilter) => [
      ...queryKeys.user.all,
      "user-list",
      { ...filters },
    ],
  },
  game: {
    all: ["game"] as const,
    list: (params: GameFilter) => [
      ...queryKeys.game.all,
      "game-list",
      { ...params },
    ],
  },
  membership: {
    all: ["membership"] as const,
    list: (params: PaginationFilter) => [
      ...queryKeys.membership.all,
      "membership-list",
      { ...params },
    ],
  },
};
