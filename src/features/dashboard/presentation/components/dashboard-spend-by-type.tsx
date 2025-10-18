'use client';

import moment from 'moment';
import {Bar, BarChart, CartesianGrid, Legend, XAxis} from 'recharts';

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

  const start = moment(dashboardStartDate);
  const end = moment(dashboardEndDate);
  const diffMonths = end.diff(start, 'months');

  let groupBy = 'month';
  if (diffMonths === 0) {
    groupBy = 'day';
  } else if (diffMonths <= 3) {
    groupBy = 'week';
  }

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

  const grouped = allTransactions.reduce(
    (acc, item) => {
      const date = moment(item.transactionDate);
      let key;
      if (groupBy === 'day') {
        key = date.format('YYYY-MM-DD');
      } else if (groupBy === 'week') {
        key = date.startOf('week').format('YYYY-MM-DD');
      } else {
        key = date.format('YYYY-MM');
      }
      if (!acc[key]) {
        acc[key] = { debit: 0, credit: 0 };
      }
      acc[key].debit += item.debit || 0;
      acc[key].credit += item.credit || 0;
      return acc;
    },
    {} as Record<string, { debit: number; credit: number }>
  );

  const chartData = groupBy === 'day' ? (() => {
    const monthStart = start.clone().startOf('month');
    const monthEnd = start.clone().endOf('month');
    const allDays = [];
    let current = monthStart.clone();
    while (current.isSameOrBefore(monthEnd)) {
      allDays.push(current.format('YYYY-MM-DD'));
      current.add(1, 'day');
    }
    return allDays.map(day => ({
      month: day,
      debit: grouped[day]?.debit || 0,
      credit: grouped[day]?.credit || 0,
    }));
  })() : Object.keys(grouped)
    .sort()
    .map(key => ({
      month: key,
      debit: grouped[key].debit,
      credit: grouped[key].credit,
    }));

  if (isGettingTransactionsByType) {
    return <BarChartLoader />;
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="h-fit">
        <CardTitle>Spend by Type</CardTitle>
        <CardDescription>
          {start.format('DD MMM, YYYY')} - {end.format('DD MMM, YYYY')}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 h-[80%]">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => {
                if (groupBy === 'day') return moment(value).format('DD');
                if (groupBy === 'week') return `W${moment(value).week()}`;
                return moment(value).format('MMM');
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="debit" fill="var(--color-debit)" radius={4} />
            <Bar dataKey="credit" fill="var(--color-credit)" radius={4} />
            <Legend />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm w-full h-fit">
        <div className="text-muted-foreground leading-none text-center w-full">
          Showing spend by debit and credit over time
        </div>
      </CardFooter>
    </Card>
  );
}
