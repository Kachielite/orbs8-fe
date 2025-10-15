import {Eye} from 'lucide-react';
import React, {useState} from 'react';

import TableSkeleton from '@/core/common/presentation/components/loaders/table-skeleton';
import {Button} from '@/core/common/presentation/components/ui/button';
import {Checkbox} from '@/core/common/presentation/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/core/common/presentation/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/core/common/presentation/components/ui/table';

import useGetAccounts from '../state/hooks/use-get-accounts';

const columns = [
  { key: 'accountName', label: 'Account Name' },
  { key: 'accountNumber', label: 'Account Number' },
  { key: 'bankName', label: 'Bank Name' },
  { key: 'currency', label: 'Currency' },
  { key: 'balance', label: 'Balance' },
];

function AccountTable() {
  const { isGettingAccounts, accounts } = useGetAccounts();
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map(col => col.key)
  );

  const filteredAccounts = accounts || [];

  const toggleColumn = (columnKey: string) => {
    setVisibleColumns(prev =>
      prev.includes(columnKey)
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  if (isGettingAccounts) {
    return <TableSkeleton rows={5} columns={visibleColumns.length} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Accounts</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map(col => (
              <DropdownMenuItem key={col.key} onClick={() => toggleColumn(col.key)}>
                <Checkbox
                  checked={visibleColumns.includes(col.key)}
                  onCheckedChange={() => toggleColumn(col.key)}
                  className="bg-foreground"
                />
                <span className="ml-2">{col.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table className="border border-border">
        <TableHeader className="bg-muted">
          <TableRow>
            {columns
              .filter(col => visibleColumns.includes(col.key))
              .map(col => (
                <TableHead key={col.key} className="border-r border-border last:border-r-0">{col.label}</TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAccounts.map(account => (
            <TableRow key={account.id} className="border-b-2 border-border">
              {visibleColumns.includes('accountName') && (
                <TableCell className="border-r border-border last:border-r-0">{account.accountName}</TableCell>
              )}
              {visibleColumns.includes('accountNumber') && (
                <TableCell className="border-r border-border last:border-r-0">{account.accountNumber}</TableCell>
              )}
              {visibleColumns.includes('bankName') && (
                <TableCell className="border-r border-border last:border-r-0">{account.bankName}</TableCell>
              )}
              {visibleColumns.includes('currency') && (
                <TableCell className="border-r border-border last:border-r-0">{account.currencyName}</TableCell>
              )}
              {visibleColumns.includes('balance') && (
                <TableCell className="border-r border-border last:border-r-0">{account.currentBalance.toLocaleString()}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AccountTable;
