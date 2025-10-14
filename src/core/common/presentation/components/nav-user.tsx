import {ChevronsUpDown, LogOut} from 'lucide-react';
import {useState} from 'react';

import {CustomAlertDialogue} from '@/core/common/presentation/components/dialogue/custom-alert-dialogue';
import {Avatar, AvatarFallback,} from '@/core/common/presentation/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/core/common/presentation/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/core/common/presentation/components/ui/sidebar';
import {useAppStore} from '@/core/common/presentation/state/store';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, setAuth } = useAppStore();

  const [showLogout, setShowLogout] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth(null);
    setShowLogout(false);
    window.location.href = '/login';
  };

  const getFullNameInitials = (fullName: string | undefined) => {
    const names = (fullName || 'John Doe')?.split(' ');
    const initials = names.map(name => name.charAt(0).toUpperCase());
    return initials.join('')?.slice(0, 2);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {getFullNameInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal"></DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setShowLogout(true)}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <CustomAlertDialogue
        title="Confirm Logout"
        description="You’re about to end your current session. Do you want to continue logging out?"
        visibility={showLogout}
        setVisibility={setShowLogout}
        action={handleLogout}
      />
    </SidebarMenu>
  );
}
