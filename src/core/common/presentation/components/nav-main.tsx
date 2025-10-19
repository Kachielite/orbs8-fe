import {type LucideIcon} from 'lucide-react';
import {useLocation, useNavigate} from 'react-router-dom';

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
    const location = useLocation();
  return (
    <SidebarGroup>
      <SidebarMenu>
          {items.map(item => {
              const isActive = location.pathname === item.url;
              return (
                  <SidebarMenuItem key={item.title} onClick={() => navigate(item.url)}>
                      <SidebarMenuButton
                          tooltip={item.title}
                          className={
                              isActive
                                  ? 'bg-sidebar-primary text-white font-semibold'
                                  : ''
                          }
                      >
                          {item.icon && <item.icon/>}
                          <span>{item.title}</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              );
          })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
