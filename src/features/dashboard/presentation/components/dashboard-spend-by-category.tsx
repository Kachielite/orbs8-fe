import moment from 'moment/moment';
import {Pie, PieChart} from "recharts";

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
    ChartTooltipContent
} from "@/core/common/presentation/components/ui/chart";
import {useAppStore} from '@/core/common/presentation/state/store';
import {PieChartLoader} from "@/features/dashboard/presentation/components/pie-chart-loader";
import useDashboardTransactionsSummary
    from '@/features/dashboard/presentation/state/hooks/use-dashboard-transactions-summary';

export function DashboardSpendByCategory() {
    const {dashboardTransactionsSummary, dashboardStartDate, dashboardEndDate, user} =
    useAppStore();
  const { isGettingTransactionSummary } = useDashboardTransactionsSummary();
  const rawData = dashboardTransactionsSummary?.topSpendByCategory || [];

  const start = moment(dashboardStartDate);
  const end = moment(dashboardEndDate);

  if (isGettingTransactionSummary) {
      return <PieChartLoader/>;
  }

    const chartData = rawData.map((item, index) => ({
        type: item.name,
        percentage: item.percentage,
        amount: item.amount,
        fill: `var(--chart-${index + 1})`,
    }));

    const chartConfig = rawData.reduce((config, item, index) => {
        config[item.name] = {
            label: item.name,
            color: `var(--chart-${index + 1})`,
        };
        return config;
    }, {} as ChartConfig);


  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Spend by Category</CardTitle>
        <CardDescription>
          {start.format('DD MMM, YYYY')} - {end.format('DD MMM, YYYY')}
        </CardDescription>
      </CardHeader>
        <CardContent className="flex-1 pb-0">
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[300px]"
            >
                <PieChart>
                    <Pie data={chartData} dataKey="percentage" nameKey="type"/>
                    <ChartTooltip content={<ChartTooltipContent hideLabel={false}/>}/>
                </PieChart>
            </ChartContainer>
            <div className="flex flex-wrap flex-row justify-center gap-4 mt-4">
                {chartData.map(item => (
                    <div key={item.type} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded shrink-0"
                            style={{backgroundColor: item.fill}}
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
          Showing total spend by category
        </div>
      </CardFooter>
    </Card>
  );
}
