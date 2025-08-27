import * as React from "react"
import Link from "next/link"
import { auth } from "@/server/auth"

import {
  IconInnerShadowTop,
} from "@tabler/icons-react"

import { NavMain } from "@/app/admin/_components/nav-main"
import { NavUser } from "@/app/admin/_components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
    },
    {
      title: "Countries", 
      url: "/countries",
    },
    {
      title: "Xtream",
      url: "/xtream", 
    },
    {
      title: "Category",
      url: "/category",
    },
  ],
}

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = await auth();
  
  if (!session?.user) {
    return null; 
  }

  const { user } = session;
  
  const userData = {
    name: user.name || "Unknown User",
    email: user.email || "",
    avatar: user.image || "/default-avatar.png", 
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">IPTV</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
