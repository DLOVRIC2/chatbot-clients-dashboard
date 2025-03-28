import DashboardSidebar from "./_components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ToolMenu from "./_components/tool-menu";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width-mobile": "16rem",
          "--sidebar-background": "#ffff",
        } as React.CSSProperties
      }
    >
      <ToolMenu />
      <DashboardSidebar />
      <main className="p-4 mt-4 ml-1 w-full rounded-tl-lg border bg-white dark:bg-[#212121] ">
        {children}
      </main>
    </SidebarProvider>
  );
}
