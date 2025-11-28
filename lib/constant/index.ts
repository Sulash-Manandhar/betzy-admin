import {
  Bell,
  ClipboardList,
  Dices,
  Image,
  MailWarning,
  User,
  Users,
  Wallet,
} from "lucide-react";
import { AdminUrl } from "../types";

export const PRODUCTION = "production";
export const DEVELOPMENT = "development";

export const ADMIN_URL_LIST: Array<AdminUrl> = [
  {
    title: "User",
    url: "/admin/users",
    icon: User,
  },
  {
    title: "Game",
    url: "/admin/games",
    icon: Dices,
  },
  {
    title: "Gallery",
    url: "/admin/gallery",
    icon: Image,
  },
  {
    title: "User Game Tag",
    url: "/admin/user-game-tag",
    icon: MailWarning,
  },
  {
    title: "Tasks",
    url: "/admin/tasks",
    icon: ClipboardList,
  },
  {
    title: "Memberships",
    url: "/admin/membership",
    icon: Users,
  },
  {
    title: "Wallet Deposit",
    url: "/admin/wallet-deposit",
    icon: Wallet,
  },
  {
    title: "Notification",
    url: "/admin/notification",
    icon: Bell,
  },
];

export const ADMIN_USER_EMAILS = [
  "admin@betzy.fun",
  "awalupshot@gmail.com",
  "sulash.manandhar@gmail.com",
];

export const COLORFUL_GRID = [
  "bg-green-400",
  "bg-blue-300",
  "bg-white",
  "bg-blue-500",
  "bg-orange-400",
  "bg-red-500",
  "bg-yellow-400",
  "bg-orange-500",
  "bg-red-400",
];

export const BRAND_NAME = "BETZY.FUN";

export const PAGE_SIZES = [10, 20, 30, 40, 50];
export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 30;

export const DEFAULT_STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const DEFAULT_GC_TIME = 1000 * 60 * 10; // garbage collection time (formerly cacheTime)
