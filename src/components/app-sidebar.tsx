"use client";

import logo from "@/assets/logo.png";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { commonNav, roleNavs } from "@/services/dashboard/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState(null);
  const [navItems, setNavItems] = useState(commonNav); // Default to common only

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getUserInfo();
        if (res) {
          setUser(res);

          const specificNav = roleNavs[res.role] || [];
          setNavItems([...commonNav, ...specificNav]);
        }
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    }
    fetchUser();
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/">
                <div className="text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  {/* Fallback logo if image fails or loading */}
                  <Image src={logo} alt="Logo" width={32} height={32} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Hitch</span>
                  <span className="truncate text-xs">Event Platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Pass the dynamically calculated items */}
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
