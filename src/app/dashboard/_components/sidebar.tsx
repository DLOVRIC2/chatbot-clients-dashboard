import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import DashboardSidebarMenu from "./sidebar-menu";
import UserInfo from "@/components/common/user-info";
import { AlgoriseInfo } from "@/components/common/algorise-info";

export default function DashboardSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <UserInfo />
      </SidebarHeader>
      <SidebarContent className="p-1 hide-scrollbar">
        <DashboardSidebarMenu menu_title={"Today"} />
        <DashboardSidebarMenu menu_title={"Last 7 Days"} />
      </SidebarContent>
      <SidebarFooter>
        <AlgoriseInfo />
      </SidebarFooter>
    </Sidebar>
  );
}
