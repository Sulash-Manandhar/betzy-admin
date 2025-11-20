import Sidebar from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthTokenProvider } from "@/context/AuthTokenProvider";
import ImageGalleryProvider from "@/context/ImageGalleryProvider";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-200">
      <AuthTokenProvider>
        <ImageGalleryProvider>
          <SidebarProvider>
            <aside>
              <Sidebar />
            </aside>
            <main className="p-2 w-full overflow-hidden">
              <div className="flex items-center p-2 border-b border-sidebar-border gap-2 overflow-hidden">
                <SidebarTrigger />
                <Separator orientation="vertical" />
                <h2 className="font-medium">Betzy Admin Dashboard</h2>
              </div>
              {children}
            </main>
          </SidebarProvider>
        </ImageGalleryProvider>
      </AuthTokenProvider>
    </div>
  );
}
