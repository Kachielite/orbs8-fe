import { Calendar } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';

import { Button } from '@/core/common/presentation/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/core/common/presentation/components/ui/dropdown-menu';
import { Input } from '@/core/common/presentation/components/ui/input';
import { useAppStore } from '@/core/common/presentation/state/store';

const TransactionDateFilter: React.FC = () => {
  const {
    transactionStartDate,
    transactionEndDate,
    setTransactionStartDate,
    setTransactionEndDate,
  } = useAppStore();

  // Local temporary values while the popover is open
  const [open, setOpen] = useState(false);
  const [tempStart, setTempStart] = useState<string>(
    transactionStartDate ?? ''
  );
  const [tempEnd, setTempEnd] = useState<string>(transactionEndDate ?? '');

  // When the popover opens, seed temp values from the store
  useEffect(() => {
    if (open) {
      setTempStart(transactionStartDate ?? '');
      setTempEnd(transactionEndDate ?? '');
    }
  }, [open, transactionStartDate, transactionEndDate]);

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value; // YYYY-MM-DD from the date input
    setTempStart(val);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTempEnd(val);
  };

  const handleResetTemp = () => {
    const defaultStart = moment().startOf('month').format('YYYY-MM-DD');
    const defaultEnd = moment().endOf('month').format('YYYY-MM-DD');
    setTempStart(defaultStart);
    setTempEnd(defaultEnd);
    setTransactionStartDate(defaultStart);
    setTransactionEndDate(defaultEnd);
  };

  // validation: ensure start < end when both provided and valid
  const isRangeValid = useMemo(() => {
    if (!tempStart || !tempEnd) return true; // allow open-ended ranges
    const s = moment(tempStart, 'YYYY-MM-DD', true);
    const e = moment(tempEnd, 'YYYY-MM-DD', true);
    if (!s.isValid() || !e.isValid()) return false;
    // require strictly before
    return s.isBefore(e);
  }, [tempStart, tempEnd]);

  const handleApply = () => {
    // Do not apply if range invalid
    if (!isRangeValid) return;

    // Validate and commit dates (strict parse)
    if (tempStart) {
      const s = moment(tempStart, 'YYYY-MM-DD', true);
      if (s.isValid()) setTransactionStartDate(s.format('YYYY-MM-DD'));
    } else {
      setTransactionStartDate('');
    }

    if (tempEnd) {
      const e = moment(tempEnd, 'YYYY-MM-DD', true);
      if (e.isValid()) setTransactionEndDate(e.format('YYYY-MM-DD'));
    } else {
      setTransactionEndDate('');
    }

    setOpen(false);
  };

  const handleCancel = () => {
    // discard changes and close
    setTempStart(transactionStartDate ?? '');
    setTempEnd(transactionEndDate ?? '');
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={val => setOpen(val)}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="mr-2">
          <Calendar className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 p-3">
        <div className="flex flex-col space-y-2 text-sm">
          <label className="text-xs font-medium">From</label>
          <Input
            type="date"
            value={tempStart ?? ''}
            onChange={handleStartChange}
            aria-invalid={!isRangeValid}
          />

          <label className="text-xs font-medium">To</label>
          <Input
            type="date"
            value={tempEnd ?? ''}
            onChange={handleEndChange}
            aria-invalid={!isRangeValid}
          />

          {!isRangeValid && (
            <div className="text-xs text-destructive">
              Start date must be before end date.
            </div>
          )}

          <div className="flex justify-end pt-1 space-x-2">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="ghost" size="sm" onClick={handleResetTemp}>
              Reset
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleApply}
              disabled={!isRangeValid}
            >
              Apply
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TransactionDateFilter;
