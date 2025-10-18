import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
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
import { useAppStore } from '@/core/common/presentation/state/store';
import { PieChartLoader } from '@/features/dashboard/presentation/components/dashboard-spend-by-category-loader';
import useDashboardTransactionsSummary from '@/features/dashboard/presentation/state/hooks/use-dashboard-transactions-summary';

const chartConfig = {
  visitors: {
    label: 'Amount',
  },
} satisfies ChartConfig;

export function DashboardSpendByCategory() {
  const { dashboardTransactionsSummary } = useAppStore();
  const { isGettingTransactionSummary } = useDashboardTransactionsSummary();
  const rawData = dashboardTransactionsSummary?.topSpendByCategory || [];
  const total = rawData.reduce((sum, item) => sum + item.amount, 0);
  const chartData = rawData.map((item, index) => ({
    browser: item.name,
    visitors: item.amount,
    fill: `var(--chart-${(index % 5) + 1})`,
  }));

  if (isGettingTransactionSummary) {
    return <PieChartLoader />;
  }
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Spend by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[500px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={130}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          ${total.toFixed(2)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Spend
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {chartData.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2 mb-5 justify-center">
            {chartData.map(item => (
              <div
                key={item.browser}
                className="flex items-center gap-1 text-sm"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                ></div>
                <span>
                  {item.browser}: ${item.visitors.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="text-muted-foreground leading-none">
          Showing total spend by category
        </div>
      </CardFooter>
    </Card>
  );
}
