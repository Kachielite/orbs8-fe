import moment from "moment";
import React, {useState} from 'react';

import ColumnToggleDropdown from "@/core/common/presentation/components/column-toggle-dropdown";
import TableSkeleton from "@/core/common/presentation/components/loaders/table-skeleton";
import {Button} from '@/core/common/presentation/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/core/common/presentation/components/ui/table";
import {useAppStore} from "@/core/common/presentation/state/store";
import useGetTransactions from "@/features/transactions/presentation/state/hooks/use-get-transactions";


function TransactionTable() {
    const { transactions, user } = useAppStore();
    const {isGettingTransactions, handleUpdateQuery, page, limit} = useGetTransactions();

    const columns = [
    { key: 'description', label: 'Description' },
    { key: 'transactionID', label: 'Transaction ID' },
    { key: 'amount', label: `Amount (${user?.preferredCurrency || 'USD'})` },
    { key: 'type', label: 'Type' },
    { key: 'category', label: 'Category' },
       { key: 'account', label: 'Account' },
        { key: 'bank', label: 'Bank' },
        { key: 'transactionDate', label: 'Transaction Date' },
    ];

      const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map(col => col.key)
  );

  const toggleColumn = (columnKey: string) => {
    setVisibleColumns(prev =>
      prev.includes(columnKey)
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    );
  };

    if (isGettingTransactions) {
    return <TableSkeleton rows={5} columns={visibleColumns.length} />;
  }

  const currentPage = page;
  const perPage = limit;
  const total = transactions?.total ?? 0;
  const totalPages = perPage > 0 ? Math.max(1, Math.ceil(total / perPage)) : 1;
  const start = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const end = Math.min(total, start + (transactions?.data?.length ?? 0) - 1);

  const goToPrevious = () => {
    if (currentPage > 1) handleUpdateQuery('page', currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) handleUpdateQuery('page', currentPage + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">List of Transactions</h2>
        <ColumnToggleDropdown
          columns={columns}
          visibleColumns={visibleColumns}
          onToggleColumn={toggleColumn}
        />
      </div>
      <Table className="border border-border">
        <TableHeader className="bg-muted">
          <TableRow>
            {columns
              .filter(col => visibleColumns.includes(col.key))
              .map(col => (
                <TableHead
                  key={col.key}
                  className="border-r border-border last:border-r-0"
                >
                  {col.label}
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.data?.map(transaction => (
            <TableRow key={transaction.id} className="border-b-2 border-border">
                              {visibleColumns.includes('transactionID') && (
                <TableCell className="border-r border-border last:border-r-0">
                  {transaction.transactionId}
                </TableCell>
              )}
              {visibleColumns.includes('description') && (
                <TableCell className="border-r border-border last:border-r-0">
                  {transaction.description.substring(0, 50)}
                </TableCell>
              )}
              {visibleColumns.includes('amount') && (
                <TableCell className="border-r border-border last:border-r-0">
                  {transaction.amount.toLocaleString('en-US')}
                </TableCell>
              )}
              {visibleColumns.includes('type') && (
                <TableCell className="border-r border-border last:border-r-0">
                  {transaction.type}
                </TableCell>
              )}
              {visibleColumns.includes('category') && (
                <TableCell className="border-r border-border last:border-r-0">
                  {transaction.category}
                </TableCell>
              )}
                              {visibleColumns.includes('account') && (
                <TableCell className="border-r border-border last:border-r-0">
                  {transaction.account}
                </TableCell>
              )}
                                              {visibleColumns.includes('bank') && (
                <TableCell className="border-r border-border last:border-r-0">
                  {transaction.bank}
                </TableCell>
              )}
                                              {visibleColumns.includes('transactionDate') && (
                <TableCell className="border-r border-border last:border-r-0">
                  {moment(transaction.transactionDate).format('DD/MM/YYYY')}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination controls */}
      <div className="flex items-center justify-between mt-2">
        <div className="text-sm text-muted-foreground">
          {total === 0 ? 'No transactions' : `Showing ${start} - ${end} of ${total}`}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={goToPrevious} disabled={currentPage <= 1 || total === 0}>
            Prev
          </Button>

          {/* Page buttons with ellipsis */}
          <div className="flex items-center space-x-1">
            {(() => {
              const pageItems: (number | string)[] = [];
              const delta = 2; // show up to 2 pages before and after current
              const left = Math.max(1, currentPage - delta);
              const right = Math.min(totalPages, currentPage + delta);

              if (left > 1) {
                pageItems.push(1);
                if (left > 2) pageItems.push('...');
              }

              for (let p = left; p <= right; p++) pageItems.push(p);

              if (right < totalPages) {
                if (right < totalPages - 1) pageItems.push('...');
                pageItems.push(totalPages);
              }

              return pageItems.map((p, idx) =>
                typeof p === 'number' ? (
                  <button
                    key={p}
                    onClick={() => handleUpdateQuery('page', p)}
                    disabled={p === currentPage}
                    className={`px-3 py-1 rounded text-sm border ${p === currentPage ? 'bg-foreground text-background border-foreground' : 'bg-background text-foreground border-border'}`}
                  >
                    {p}
                  </button>
                ) : (
                  <span key={`dot-${idx}`} className="px-2 text-sm">{p}</span>
                )
              );
            })()}
          </div>

          <Button variant="outline" size="sm" onClick={goToNext} disabled={currentPage >= totalPages || total === 0}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TransactionTable;
