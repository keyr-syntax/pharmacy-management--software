import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import ThemeToggle from "@/components/ui/ThemeToggle";
import { DashboardMenuItems } from "@/lib/DashboardMenuOptions";
import { ChevronUp, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";
import { Link, useNavigate } from "react-router-dom";
import { logoutPharmacyUser } from "@/services/UserApiService";

export function AppSidebar() {
  const name: string | null = localStorage.getItem("name");
  const navigate = useNavigate();

  const handlePharmacyUserLogout = async () => {
    const success = await logoutPharmacyUser();

    if (success) {
      navigate("/");
    } else {
      return;
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <ThemeToggle />
              {DashboardMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem />
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {name ? (
                    <span className="text-xl">{name}</span>
                  ) : (
                    <>
                      <User2 /> <span className="text-xl">Username</span>{" "}
                    </>
                  )}

                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem className="cursor-pointer text-lg">
                  <Link to="/dashboard/edit_my_account">Edit My Account</Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    handlePharmacyUserLogout();
                  }}
                  className="cursor-pointer text-lg"
                >
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
