export const queryKeys = {
  user: {
    all: ["user"] as const,
    list: () => [...queryKeys.user.all, "user-list"],
  },
};
