import { MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import React, { useMemo, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/core/common/presentation/components/ui/alert-dialog';
import { Button } from '@/core/common/presentation/components/ui/button';
import { Checkbox } from '@/core/common/presentation/components/ui/checkbox';
import { Input } from '@/core/common/presentation/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/common/presentation/components/ui/select';
import { useAppStore } from '@/core/common/presentation/state/store';
import { TransactionModel } from '@/features/transactions/data/model/transaction.model';
import { IUpdateTransactionQuery } from '@/features/transactions/domain/entity/interface/transactions.interface';
import useUpdateTransaction from '@/features/transactions/presentation/state/hooks/use-update-transaction';

const TransactionUpdate: React.FC<{ transaction: TransactionModel }> = ({
  transaction,
}) => {
  const { categories } = useAppStore();
  const { updateTransaction, isUpdatingTransaction } = useUpdateTransaction();

  const [open, setOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(transaction.categoryId ?? undefined);
  const [commonName, setCommonName] = useState<string>('');
  const [applyToAll, setApplyToAll] = useState<boolean>(false);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);

  // Validation: commonName must be a single word (no spaces). Empty is allowed.
  const isCommonNameValid = useMemo(() => {
    const val = commonName.trim();
    if (!val) return true; // optional
    return /^\S+$/.test(val); // no whitespace allowed
  }, [commonName]);

  const handleConfirmUpdate = () => {
    if (!selectedCategoryId) return;

    const payload: IUpdateTransactionQuery = {
      categoryId: selectedCategoryId,
    };

    if (commonName && commonName.trim().length > 0)
      payload.commonName = commonName.trim();
    if (applyToAll !== undefined) payload.applyToAll = applyToAll;

    updateTransaction(
      { id: transaction.id, payload },
      {
        onSuccess: () => {
          setUpdateOpen(false);
          setOpen(false);
        },
      }
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen(true)}
          aria-label="Actions"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Transaction Details</AlertDialogTitle>
          <AlertDialogDescription>
            View details and update category for this transaction.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-3 mt-2">
          <div className="text-sm">
            <div className="font-medium">Description</div>
            <div className="text-muted-foreground">
              {transaction.description}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="font-medium">Amount</div>
              <div className="text-muted-foreground">
                {transaction.amount.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="font-medium">Date</div>
              <div className="text-muted-foreground">
                {moment(transaction.transactionDate).format('DD/MM/YYYY')}
              </div>
            </div>
            <div>
              <div className="font-medium">Account</div>
              <div className="text-muted-foreground">{transaction.account}</div>
            </div>
            <div>
              <div className="font-medium">Bank</div>
              <div className="text-muted-foreground">{transaction.bank}</div>
            </div>
          </div>
          <div className="text-sm">
            <div className="font-medium">Category</div>
            {categories && categories.length > 0 ? (
              <div className="mt-1">
                <Select
                  value={selectedCategoryId ? String(selectedCategoryId) : ''}
                  onValueChange={val =>
                    setSelectedCategoryId(val ? Number(val) : undefined)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={transaction.category ?? 'Select category'}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(c => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="text-muted-foreground">
                {transaction.category}
              </div>
            )}
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpen(false);
              setUpdateOpen(false);
            }}
          >
            Close
          </AlertDialogCancel>
          {/* Show Update in footer only when the user has changed the category */}
          {selectedCategoryId !== undefined &&
            selectedCategoryId !== transaction.categoryId && (
              <AlertDialogAction onClick={() => setUpdateOpen(true)}>
                Update
              </AlertDialogAction>
            )}
        </AlertDialogFooter>
      </AlertDialogContent>

      {/* Nested confirmation dialog for update details */}
      <AlertDialog open={updateOpen} onOpenChange={setUpdateOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Category</AlertDialogTitle>
            <AlertDialogDescription>
              The app is always learning — provide an optional common name and
              the app will try to assign similar transactions to this category
              in future syncs.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-6 mt-2">
            <div>
              <div className="font-medium text-sm">Common Name (optional)</div>
              <Input
                placeholder="Common name for similar transactions"
                value={commonName}
                onChange={e => setCommonName(e.target.value)}
                className="mt-1"
                aria-invalid={!isCommonNameValid}
              />
              {!isCommonNameValid && (
                <div className="text-xs text-destructive mt-1">
                  Common name must be a single word (no spaces).
                </div>
              )}
            </div>

            <div className="flex items-center">
              <Checkbox
                checked={applyToAll}
                onCheckedChange={v => setApplyToAll(Boolean(v))}
              />
              <span className="ml-2 text-sm">
                Apply to similar existing transactions
              </span>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUpdateOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmUpdate}
              disabled={
                !selectedCategoryId ||
                isUpdatingTransaction ||
                !isCommonNameValid
              }
            >
              {isUpdatingTransaction ? 'Updating...' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialog>
  );
};

export default TransactionUpdate;
