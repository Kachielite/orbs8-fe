'use client';

import moment from 'moment';
import {Pie, PieChart} from 'recharts';

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
import {useAppStore} from '@/core/common/presentation/state/store';
import {PieChartLoader} from '@/features/dashboard/presentation/components/pie-chart-loader';
import useDashboardTransactionsSummary
    from '@/features/dashboard/presentation/state/hooks/use-dashboard-transactions-summary';

const chartConfig = {
  income: {
    label: 'Income',
    color: 'var(--chart-1)',
  },
  spend: {
    label: 'Spend',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function DashboardIncomeByCategory() {
  const {
    dashboardTransactionsSummary,
    transactionStartDate,
    transactionEndDate,
      user
  } = useAppStore();
  const { isGettingTransactionSummary } = useDashboardTransactionsSummary();
  const { totalIncome, totalSpend } = dashboardTransactionsSummary || {};

  const total = (totalIncome || 0) + (totalSpend || 0);
  const incomePercentage = total > 0 ? ((totalIncome || 0) / total) * 100 : 0;
  const spendPercentage = total > 0 ? ((totalSpend || 0) / total) * 100 : 0;

  const chartData = [
    { type: 'income', amount: totalIncome,  percentage: incomePercentage, fill: 'var(--chart-1)' },
    { type: 'spend', amount: totalSpend, percentage: spendPercentage, fill: 'var(--chart-2)' },
  ];

  const start = moment(transactionStartDate).format('DD MMM, YYYY');
  const end = moment(transactionEndDate).format('DD MMM, YYYY');

  if (isGettingTransactionSummary) {
    return <PieChartLoader />;
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Income vs Spend</CardTitle>
        <CardDescription>
          {start} - {end}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="percentage" nameKey="type" />
            <ChartTooltip content={<ChartTooltipContent hideLabel={false} />} />
          </PieChart>
        </ChartContainer>
        <div className="flex justify-center gap-4 mt-4">
          {chartData.map(item => (
            <div key={item.type} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: item.fill }}
              ></div>
              <span className="text-xs">
                {chartConfig[item.type as keyof typeof chartConfig].label}: {user?.preferredCurrency || "USD"} {item?.amount?.toLocaleString() || 0}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing total income vs total spend
        </div>
      </CardFooter>
    </Card>
  );
}
