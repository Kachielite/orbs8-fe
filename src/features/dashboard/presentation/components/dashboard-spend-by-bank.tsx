'use client';

import moment from 'moment/moment';
import {Bar, BarChart, XAxis, YAxis} from 'recharts';

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
import useDashboardTransactionsByBank
    from '@/features/dashboard/presentation/state/hooks/use-dashboard-transactions-by-bank';
import {TransactionType} from '@/features/transactions/domain/entity/enum/transaction-type.enum';

const chartConfig = {
    credit: {
        label: 'Credit',
        color: 'var(--chart-2)',
    },
    debit: {
        label: 'Debit',
        color: 'var(--chart-1)',
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
        <div className="flex flex-col space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-8 w-32" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <Skeleton className="h-4 w-48" />
      </CardFooter>
    </Card>
  );
}

export function DashboardSpendByBank() {
  const { dashboardSpendingByBanks, dashboardEndDate, dashboardStartDate } =
    useAppStore();
  const { isGettingTransactionsByBank } = useDashboardTransactionsByBank();

  const grouped =
    dashboardSpendingByBanks?.reduce(
      (acc, item) => {
        const bank = item.bankName;
        if (!acc[bank]) {
            acc[bank] = {credit: 0, debit: 0};
        }
          item.transactions.forEach(transaction => {
              if (transaction.type === TransactionType.CREDIT) {
                  acc[bank].credit += transaction.amount;
              } else if (transaction.type === TransactionType.DEBIT) {
                  acc[bank].debit += transaction.amount;
              }
          });
        return acc;
      },
        {} as Record<string, { credit: number; debit: number }>
    ) || {};

  const chartData = Object.keys(grouped).map(bank => ({
      bank: bank,
      credit: grouped[bank].credit,
      debit: grouped[bank].debit,
  }));

  if (isGettingTransactionsByBank) {
    return <BarChartLoader />;
  }
  const start = moment(dashboardStartDate);
  const end = moment(dashboardEndDate);

  return (
      <Card className="flex flex-col h-full">
      <CardHeader>
          <CardTitle>Transaction by Bank</CardTitle>
        <CardDescription>
          {start.format('DD MMM, YYYY')} - {end.format('DD MMM, YYYY')}
        </CardDescription>
      </CardHeader>
          <CardContent className="flex-1 pb-0 min-h-0">
              <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
                dataKey="bank"
              type="category"
              tickLine={false}
              tickMargin={2}
              axisLine={false}
                tickFormatter={(value) => value.split(' ')[0]}
            />
              <XAxis type="number" hide/>
              <ChartTooltip cursor content={<ChartTooltipContent/>}/>
              <Bar dataKey="credit" fill="var(--color-credit)" layout="vertical" radius={2}/>
              <Bar dataKey="debit" fill="var(--color-debit)" layout="vertical" radius={2}/>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm w-full">
          <div className="flex items-center justify-center gap-4 w-full">
              <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{backgroundColor: 'var(--chart-2)'}}></div>
                  <span className="text-xs text-muted-foreground">Credit</span>
              </div>
              <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{backgroundColor: 'var(--chart-1)'}}></div>
                  <span className="text-xs text-muted-foreground">Debit</span>
              </div>
          </div>
        <div className="text-muted-foreground leading-none w-full text-center">
            Showing credit and debit transactions by bank
        </div>
      </CardFooter>
    </Card>
  );
}
