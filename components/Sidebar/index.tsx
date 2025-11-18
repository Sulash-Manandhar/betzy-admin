import { SignedIn, UserButton } from "@clerk/nextjs";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@components/ui/sidebar";
import { ADMIN_URL_LIST } from "@lib/constant/index";
import Link from "next/link";
import SidebarHeader from "./SidebarHeader";

export default function Sidebar() {
  return (
    <ShadcnSidebar variant="floating">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {ADMIN_URL_LIST.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4 flex justify-center">
        <SignedIn>
          <UserButton
            showName
            appearance={{
              layout: { logoPlacement: "outside" },
              captcha: {
                language: "en-US",
              },
            }}
          />
        </SignedIn>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
