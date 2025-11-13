import Sidebar from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <aside>
          <Sidebar />
        </aside>
        <main className="p-2 w-full">
          <div className="flex items-center p-2 border-b border-sidebar-border gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" />
            <h2 className="font-medium">Betzy Admin Dashboard</h2>
          </div>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
