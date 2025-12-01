export const urls = {
  user: {
    findAll: "/admin/user",
    find: "/admin/user/:id",
  },
  game: {
    findAll: "/game",
    find: "/game/:id",
    create: "/admin/game",
    update: "/admin/game/:id",
    destroy: "/admin/game/:id",
  },
  membership: {
    findAll: "/membership",
  },
  notification: {
    findAll: "/admin/notification",
  },
  gallery: {
    findAll: "/admin/gallery",
    createMany: "/admin/gallery/uploads",
    destroy: "/admin/gallery/:id",
  },
  referral: {
    findAll: "/admin/user/referrals",
  },
};
