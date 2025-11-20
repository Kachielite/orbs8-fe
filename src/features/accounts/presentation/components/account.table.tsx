import {Landmark} from 'lucide-react';
import React, {useState} from 'react';

import ColumnToggleDropdown from '@/core/common/presentation/components/column-toggle-dropdown';
import EmptyState from '@/core/common/presentation/components/empty-state';
import TableSkeleton from '@/core/common/presentation/components/loaders/table-skeleton';
import {Card, CardContent,} from '@/core/common/presentation/components/ui/card';
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
        {filteredAccounts.length === 0 ? (
            <Card>
                <CardContent className="flex items-center justify-center h-64">
                    <EmptyState
                        title="No Accounts"
                        description="No accounts to display at the moment"
                        icon={Landmark}
                    />
                </CardContent>
            </Card>
        ) : (
            <>
                <div className="flex items-center justify-between">
                    <div/>
                    <ColumnToggleDropdown
                        columns={columns}
                        visibleColumns={visibleColumns}
                        onToggleColumn={toggleColumn}
                    />
                </div>
                <Table className="border border-border">
                    <TableHeader className="bg-primary">
                        <TableRow>
                            {columns
                                .filter(col => visibleColumns.includes(col.key))
                                .map(col => (
                                    <TableHead
                                        key={col.key}
                                        className="border-r border-border last:border-r-0 text-white"
                                    >
                                        {col.label}
                                    </TableHead>
                                ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAccounts.map(account => (
                            <TableRow key={account.id} className="border-b-2 border-border">
                                {visibleColumns.includes('accountName') && (
                                    <TableCell className="border-r border-border last:border-r-0">
                                        {account.accountName}
                                    </TableCell>
                                )}
                                {visibleColumns.includes('accountNumber') && (
                                    <TableCell className="border-r border-border last:border-r-0">
                                        {account.accountNumber}
                                    </TableCell>
                                )}
                                {visibleColumns.includes('bankName') && (
                                    <TableCell className="border-r border-border last:border-r-0">
                                        {account.bankName}
                                    </TableCell>
                                )}
                                {visibleColumns.includes('currency') && (
                                    <TableCell className="border-r border-border last:border-r-0">
                                        {account.currencyName}
                                    </TableCell>
                                )}
                                {visibleColumns.includes('balance') && (
                                    <TableCell className="border-r border-border last:border-r-0">
                                        {account.currentBalance.toLocaleString('en-US')}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
        )}
    </div>
  );
}

export default AccountTable;
