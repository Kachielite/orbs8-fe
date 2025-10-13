import {GalleryVerticalEnd} from "lucide-react"
import * as React from "react"

import {SidebarMenu, SidebarMenuItem,} from "@/core/common/presentation/components/ui/sidebar"

export function Brand() {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
         <a href="#" className="flex items-center gap-2 font-medium p-2">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Orbs8 Inc.
          </a>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
