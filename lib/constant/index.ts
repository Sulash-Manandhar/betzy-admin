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

export const PRODUCTION = "production";
export const DEVELOPMENT = "development";

export const ADMIN_URL_LIST = [
  {
    title: "User",
    url: "/admin/user",
    icon: User,
  },
  {
    title: "Game",
    url: "/admin/game",
    icon: Dices,
  },
  {
    title: "Images",
    url: "/admin/image",
    icon: Image,
  },
  {
    title: "Request Game Tag",
    url: "/admin/request-game-tag",
    icon: MailWarning,
  },
  {
    title: "Task",
    url: "/admin/task",
    icon: ClipboardList,
  },
  {
    title: "Membership",
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
