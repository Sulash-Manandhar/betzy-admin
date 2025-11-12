"use client";
import React from "react";
import {
  SidebarHeader as ShadcnSidebarHeader,
  useSidebar,
} from "@components/ui/sidebar";
import { COLORFUL_GRID } from "@lib/constant/index";
import BrandName from "../common/BrandName";

export default function SidebarHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <ShadcnSidebarHeader
      className="flex flex-row gap-2 items-center mb-8 px-4 py-2 rounded-t-md bg-primary cursor-pointer"
      onClick={() => toggleSidebar()}
    >
      <div className="grid grid-cols-3 gap-1">
        {COLORFUL_GRID.map((color) => (
          <div key={color} className={`${color} w-3 h-3 rounded-full`} />
        ))}
      </div>
      <BrandName className="text-2xl font-bold text-white" />
    </ShadcnSidebarHeader>
  );
}
