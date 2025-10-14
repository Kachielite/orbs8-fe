'use client';

import {
  ArrowRightLeft,
  Brain,
  Landmark,
  LayoutDashboard,
  Settings,
} from 'lucide-react';
import * as React from 'react';

import { Brand } from '@/core/common/presentation/components/brand';
import { NavMain } from '@/core/common/presentation/components/nav-main';
import { NavUser } from '@/core/common/presentation/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/core/common/presentation/components/ui/sidebar';

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: LayoutDashboard,
    },
    {
      title: 'Transactions',
      url: '#',
      icon: ArrowRightLeft,
    },
    {
      title: 'Accounts',
      url: '#',
      icon: Landmark,
    },
    {
      title: 'Insights',
      url: '#',
      icon: Brain,
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Brand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
