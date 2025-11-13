import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type LucideIconType = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export type AdminUrl = {
  title: string;
  url: __next_route_internal_types__.RouteImpl<"/">;
  icon: LucideIconType;
};
