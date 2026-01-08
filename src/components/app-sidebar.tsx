"use client";

import * as React from "react";
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
// Import your navigation config
import { commonNav, roleNavs } from "@/services/dashboard/navigation";
import Image from "next/image";
import Link from "next/link";
import { IUser } from "@/types/user.type";

// Define props
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: IUser;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  // Logic: Calculate menu items immediately based on the prop
  // Note: Usually Role items go FIRST, then Common items (Settings) go LAST
  const specificNav = user ? roleNavs[user.role] || [] : [];
  const navItems = [...specificNav, ...commonNav];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/">
                <div className="text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
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
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
