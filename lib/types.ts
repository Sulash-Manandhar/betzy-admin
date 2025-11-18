import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

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

export type Membership = {
  id: number;
  name: string;
  ordering: number;
  pointsRequired: number;
  bonus: number;
  createdAt: string;
  updatedAt: string;
};

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
