import { Filter } from 'lucide-react';
import React from 'react';

import { Button } from '@/core/common/presentation/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/core/common/presentation/components/ui/dropdown-menu';
import { useAppStore } from '@/core/common/presentation/state/store';
import { TransactionType } from '@/features/transactions/domain/entity/enum/transaction-type.enum';

interface TransactionFilterProps {
  handleUpdateQuery: (
    type: string,
    value: string | number | number[] | undefined
  ) => void;
  transactionType?: TransactionType;
  categoryIds?: number[] | undefined;
  accountIds?: number[] | undefined;
  bankIds?: number[] | undefined;
}

const TransactionFilter: React.FC<TransactionFilterProps> = ({
  handleUpdateQuery,
  transactionType,
  categoryIds,
  accountIds,
  bankIds,
}) => {
  const { categories, accounts, banks } = useAppStore();

  const toggleArray = (key: string, id: number) => {
    const current: number[] | undefined =
      key === 'categoryIds'
        ? categoryIds
        : key === 'accountIds'
          ? accountIds
          : bankIds;

    const next =
      current && current.includes(id)
        ? current.filter(i => i !== id)
        : [...(current ?? []), id];

    handleUpdateQuery(key, next.length > 0 ? next : undefined);
  };

  const handleClearAll = () => {
    handleUpdateQuery('transactionType', undefined);
    handleUpdateQuery('categoryIds', undefined);
    handleUpdateQuery('accountIds', undefined);
    handleUpdateQuery('bankIds', undefined);
  };

  const txTypes = Object.values(TransactionType) as TransactionType[];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="mr-2">
          <Filter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <div className="px-2 py-1.5 text-sm font-semibold flex items-center justify-between">
          <span>Filters</span>
          <button
            className="ml-4 text-xs text-muted-foreground p-2 bg-background rounded-md hover:bg-muted hover:text-muted-foreground transition-colors duration-200"
            onClick={() => handleClearAll()}
          >
            Clear
          </button>
        </div>

        {/* Type */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Type</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={transactionType ?? ''}
              onValueChange={val =>
                handleUpdateQuery(
                  'transactionType',
                  val ? (val as TransactionType) : undefined
                )
              }
            >
              <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
              {txTypes.map(t => (
                <DropdownMenuRadioItem key={t} value={t}>
                  {t === TransactionType.CREDIT
                    ? 'Credit'
                    : t === TransactionType.DEBIT
                      ? 'Debit'
                      : t}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Category */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Category</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {categories && categories.length > 0 ? (
              categories.map(c => (
                <DropdownMenuCheckboxItem
                  key={c.id}
                  checked={!!categoryIds?.includes(c.id)}
                  onCheckedChange={() => toggleArray('categoryIds', c.id)}
                >
                  {c.name}
                </DropdownMenuCheckboxItem>
              ))
            ) : (
              <DropdownMenuItem disabled>No categories</DropdownMenuItem>
            )}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Account */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Account</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {accounts && accounts.length > 0 ? (
              accounts.map(a => (
                <DropdownMenuCheckboxItem
                  key={a.id}
                  checked={!!accountIds?.includes(a.id)}
                  onCheckedChange={() => toggleArray('accountIds', a.id)}
                >
                  {a.accountNumber}
                </DropdownMenuCheckboxItem>
              ))
            ) : (
              <DropdownMenuItem disabled>No accounts</DropdownMenuItem>
            )}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Bank */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Bank</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {banks && banks.length > 0 ? (
              banks.map(b => (
                <DropdownMenuCheckboxItem
                  key={b.id}
                  checked={!!bankIds?.includes(b.id)}
                  onCheckedChange={() => toggleArray('bankIds', b.id)}
                >
                  {b.name}
                </DropdownMenuCheckboxItem>
              ))
            ) : (
              <DropdownMenuItem disabled>No banks</DropdownMenuItem>
            )}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TransactionFilter;
