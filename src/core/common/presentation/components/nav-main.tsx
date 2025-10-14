import { type LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/core/common/presentation/components/ui/sidebar';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const navigate = useNavigate();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map(item => (
          <SidebarMenuItem key={item.title} onClick={() => navigate(item.url)}>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
