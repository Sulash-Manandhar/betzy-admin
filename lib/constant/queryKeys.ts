import { GameFilter, PaginationFilter, UserFilter } from "../types";

export const queryKeys = {
  user: {
    all: ["user"] as const,
    findAll: (filters: UserFilter) => [
      ...queryKeys.user.all,
      "user-list",
      { ...filters },
    ],
  },
  game: {
    all: ["game"] as const,
    findOne: (id: string) => [...queryKeys.game.all, "game", id],
    findAll: (params: GameFilter) => [
      ...queryKeys.game.all,
      "game-list",
      { ...params },
    ],
  },
  membership: {
    all: ["membership"] as const,
    findAll: (params: PaginationFilter) => [
      ...queryKeys.membership.all,
      "membership-list",
      { ...params },
    ],
  },
  notification: {
    all: ["notification"] as const,
    findAll: () => [...queryKeys.notification.all, "notification-list"],
  },
  gallery: {
    all: ["gallery"] as const,
    findAll: (params: PaginationFilter) => [
      ...queryKeys.gallery.all,
      "gallery-images",
      { ...params },
    ],
  },
};
