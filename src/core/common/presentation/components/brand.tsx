import { GalleryVerticalEnd } from 'lucide-react';
import * as React from 'react';

import {
  SidebarMenu,
  SidebarMenuItem,
} from '@/core/common/presentation/components/ui/sidebar';

export function Brand() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <a
          href="#"
          className="flex items-center gap-2 font-medium p-2 group-data-[collapsible=icon]:p-1.5"
        >
          <div className="bg-primary text-primary-foreground flex size-6 group-data-[collapsible=icon]:size-5 items-center justify-center  rounded-md">
            <GalleryVerticalEnd className="size-4 group-data-[collapsible=icon]:size-3" />
          </div>
          <span className="group-data-[collapsible=icon]:hidden">
            Orbs8 Inc.
          </span>
        </a>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
