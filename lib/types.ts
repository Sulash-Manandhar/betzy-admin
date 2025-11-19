import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

//CORE TYPES
export type LucideIconType = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export type NextUrlType = __next_route_internal_types__.RouteImpl<"/">;

export type AdminUrl = {
  title: string;
  url: NextUrlType;
  icon: LucideIconType;
};

export type ClerkToken = string | null;

export type Meta = {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  nextPage: number | null;
  previousPage: number | null;
  totalCount: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  meta: Meta;
  list: Array<T>;
};

export type PaginationFilter = {
  page: number;
  limit: number;
};

//SCHEMA

//MEMBERSHIP TYPES
export type Membership = {
  id: number;
  name: string;
  ordering: number;
  pointsRequired: number;
  bonus: number;
  createdAt: string;
  updatedAt: string;
};

//GALLERY TYpe
export type Images = {
  id: number;
  fileName: string;
  url: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

//USER TYPES
export type User = {
  balance: number;
  clerkId: string;
  createdAt: Date;
  deletedAt: Date | null;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  xp: number;
  profileUrl: string | null;
  updatedAt: Date;
  timezone?: string;
  membership: Membership;
  referralCode: string;
};

export type UserFilter = {
  email: string;
  membership: string;
} & PaginationFilter;

//GAME TYPE
export type Game = {
  name: string;
  game_link: string;
  image_id: number;
  description: string | null;
  id: number;
  image: Images | null;
  is_featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type GameFilter = {
  name: string;
  description: string;
} & PaginationFilter;
