import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import React from 'react';

import { Badge } from '@/core/common/presentation/components/ui/badge';
import { Skeleton } from '@/core/common/presentation/components/ui/skeleton';
import { useAppStore } from '@/core/common/presentation/state/store';
import useGetAccountSummary from '@/features/accounts/presentation/state/hooks/use-get-account-summary';

function ExchangeRateSkeleton() {
  return <Skeleton className="h-6 w-32" />;
}

function ExchangeRate() {
  const { isGettingAccountSummary } = useGetAccountSummary();
  const { accountSummary } = useAppStore();
  const quotes = accountSummary?.quotes || {};

  const formatRate = (key: string, rate: number) => {
    const convertedRate = (1 / rate).toFixed(2);
    return `${key} → ${convertedRate}`;
  };

  if (isGettingAccountSummary) {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: 3 }).map((_, idx) => (
          <ExchangeRateSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {Object.entries(quotes).map(([key, rate], index) => {
        const isEven = index % 2 === 0;
        const Icon = isEven ? ArrowUpRight : ArrowDownRight;
        const iconColor = isEven ? 'text-green-500' : 'text-red-500';

        return (
          <Badge
            key={key}
            variant="secondary"
            className="flex items-center gap-1 text-sm px-3 py-1 font-medium
                       rounded-2xl shadow-sm bg-white/10 backdrop-blur-sm
                       border border-white/20 hover:shadow-md transition-all"
          >
            <span className="mr-1 text-xs text-muted-foreground">💱 FX</span>
            <span className="text-foreground">{formatRate(key, rate)}</span>
          </Badge>
        );
      })}
    </div>
  );
}

export default ExchangeRate;
