'use client';

import moment from 'moment';
import {useState} from 'react';
import {Area, AreaChart, CartesianGrid, XAxis} from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/core/common/presentation/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/core/common/presentation/components/ui/chart';
import {Skeleton} from '@/core/common/presentation/components/ui/skeleton';
import {Tabs, TabsList, TabsTrigger,} from '@/core/common/presentation/components/ui/tabs';
import {useAppStore} from '@/core/common/presentation/state/store';
import useDashboardTransactionTypes
    from '@/features/dashboard/presentation/state/hooks/use-dashboard-transaction-types';

const chartConfig = {
  debit: {
    label: 'Debit',
    color: 'var(--chart-1)',
  },
  credit: {
    label: 'Credit',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

function BarChartLoader() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-40" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-32" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-end space-x-1">
              <Skeleton className="h-4 w-8" />
              <Skeleton
                className={`h-${Math.floor(Math.random() * 20) + 10} w-8`}
              />
              <Skeleton
                className={`h-${Math.floor(Math.random() * 20) + 10} w-8`}
              />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-40" />
      </CardFooter>
    </Card>
  );
}

export function DashboardSpendByType() {
  const { dashboardTransactionsByTypes, dashboardStartDate, dashboardEndDate } =
    useAppStore();
  const { isGettingTransactionsByType } = useDashboardTransactionTypes();
    const [transactionType, setTransactionType] = useState<
        'all' | 'credit' | 'debit'
    >('all');

  const start = moment(dashboardStartDate);
  const end = moment(dashboardEndDate);

    // Combine credit and debit transactions
  const allTransactions = [
    ...(dashboardTransactionsByTypes?.credit?.map(item => ({
      transactionDate: item.transactionDate,
      debit: 0,
      credit: item.amount,
    })) || []),
    ...(dashboardTransactionsByTypes?.debit?.map(item => ({
      transactionDate: item.transactionDate,
      debit: item.amount,
      credit: 0,
    })) || []),
  ];

    // Group by exact date without grouping by week/month
  const grouped = allTransactions.reduce(
    (acc, item) => {
        const key = moment(item.transactionDate).format('YYYY-MM-DD');
      if (!acc[key]) {
        acc[key] = { debit: 0, credit: 0 };
      }
      acc[key].debit += item.debit || 0;
      acc[key].credit += item.credit || 0;
      return acc;
    },
    {} as Record<string, { debit: number; credit: number }>
  );

    const chartData = Object.keys(grouped)
        .sort()
        .map(key => ({
            date: key,
            debit: grouped[key].debit,
            credit: grouped[key].credit,
            total: grouped[key].debit + grouped[key].credit,
        }));

  if (isGettingTransactionsByType) {
    return <BarChartLoader />;
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="h-fit">
          <div className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                  <CardTitle>Transaction by Type</CardTitle>
                  <CardDescription>
                      {start.format('DD MMM, YYYY')} - {end.format('DD MMM, YYYY')}
                  </CardDescription>
              </div>
              <Tabs
                  value={transactionType}
                  onValueChange={value =>
                      setTransactionType(value as 'all' | 'credit' | 'debit')
                  }
              >
                  <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="credit">Credit</TabsTrigger>
                      <TabsTrigger value="debit">Debit</TabsTrigger>
                  </TabsList>
              </Tabs>
          </div>
      </CardHeader>
        <CardContent className="flex-1 h-[70%]">
        <ChartContainer config={chartConfig} className="w-full h-full">
            <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
                dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
                tickFormatter={value => moment(value).format('MMM DD')}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot"/>}
            />
                {(transactionType === 'all' || transactionType === 'debit') && (
                    <Area
                        dataKey="debit"
                        type="monotone"
                        fill="var(--color-debit)"
                        fillOpacity={1}
                        stroke="var(--color-debit)"
                        stackId={transactionType === 'all' ? 'b' : 'a'}
                    />
                )}
                {(transactionType === 'all' || transactionType === 'credit') && (
                    <Area
                        dataKey="credit"
                        type="monotone"
                        fill="var(--color-credit)"
                        fillOpacity={1}
                        stroke="var(--color-credit)"
                        stackId={transactionType === 'all' ? 'b' : 'a'}
                    />
                )}
            </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm w-full h-fit">
          <div className="flex items-center justify-center gap-4 w-full">
              {transactionType === 'all' && (
                  <>
                      <div className="flex items-center gap-1.5">
                          <div
                              className="w-3 h-3 rounded-sm"
                              style={{backgroundColor: 'var(--chart-1'}}
                          ></div>
                          <span className="text-xs text-muted-foreground">Debit</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                          <div
                              className="w-3 h-3 rounded-sm"
                              style={{backgroundColor: 'var(--chart-2)'}}
                          ></div>
                          <span className="text-xs text-muted-foreground">Credit</span>
                      </div>
                  </>
              )}
          </div>
        <div className="text-muted-foreground leading-none text-center w-full">
            Showing spend by{' '}
            {transactionType === 'all' ? 'debit and credit' : transactionType}{' '}
            over time
        </div>
      </CardFooter>
    </Card>
  );
}
