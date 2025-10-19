import { Check, Settings2 } from 'lucide-react';
import React from 'react';

import { Button } from '@/core/common/presentation/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/core/common/presentation/components/ui/dropdown-menu';

interface Column {
  key: string;
  label: string;
}

interface ColumnToggleDropdownProps {
  columns: Column[];
  visibleColumns: string[];
  onToggleColumn: (key: string) => void;
}

function ColumnToggleDropdown({
  columns,
  visibleColumns,
  onToggleColumn,
}: ColumnToggleDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="px-2 py-1.5 text-sm font-semibold">Toggle columns</div>
        <DropdownMenuSeparator />
        {columns.map(col => (
          <DropdownMenuItem
            key={col.key}
            onClick={() => onToggleColumn(col.key)}
          >
            {visibleColumns.includes(col.key) ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <div className="w-4 h-4 mr-2" />
            )}
            <span>{col.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ColumnToggleDropdown;
