'use client';

import moment from 'moment';
import { Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/common/presentation/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/core/common/presentation/components/ui/chart';
import { useAppStore } from '@/core/common/presentation/state/store';
import { PieChartLoader } from '@/features/dashboard/presentation/components/pie-chart-loader';
import useDashboardTransactionsSummary from '@/features/dashboard/presentation/state/hooks/use-dashboard-transactions-summary';

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
  } = useAppStore();
  const { isGettingTransactionSummary } = useDashboardTransactionsSummary();
  const { totalIncome, totalSpend } = dashboardTransactionsSummary || {};

  const chartData = [
    { type: 'Income', amount: totalIncome || 0, fill: 'var(--chart-1)' },
    { type: 'Spend', amount: totalSpend || 0, fill: 'var(--chart-2)' },
  ];

  const start = moment(transactionStartDate).format('DD MMM, YYYY');
  const end = moment(transactionEndDate).format('DD MMM, YYYY');

  if (isGettingTransactionSummary) {
    return <PieChartLoader />;
  }

  return (
    <Card className="flex flex-col">
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
            <Pie data={chartData} dataKey="amount" />
            <ChartLegend
              content={<ChartLegendContent nameKey="type" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
