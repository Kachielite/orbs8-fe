import {TrendingUp} from "lucide-react";
import moment from 'moment/moment';
import {Bar, BarChart, CartesianGrid, XAxis} from 'recharts';

import EmptyState from '@/core/common/presentation/components/empty-state';
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
import useDashboardTransactionsSummary
    from '@/features/dashboard/presentation/state/hooks/use-dashboard-transactions-summary';

export function DashboardIncomeByCategory() {
    const {
        dashboardTransactionsSummary,
        dashboardStartDate,
        dashboardEndDate,
        user,
    } = useAppStore();
  const { isGettingTransactionSummary } = useDashboardTransactionsSummary();
  const rawData = dashboardTransactionsSummary?.topIncomeByCategory || [];

  const start = moment(dashboardStartDate);
  const end = moment(dashboardEndDate);

  if (isGettingTransactionSummary) {
    return (
      <Card className="flex flex-col h-full">
        <CardHeader className="items-center pb-0">
          <CardTitle>
            <Skeleton className="h-6 w-40" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-32" />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 min-h-0">
          <div className="space-y-5 pt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-12" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <Skeleton className="h-4 w-48" />
        </CardFooter>
      </Card>
    );
  }

    const chartData = rawData.map((item, index) => ({
        category: item.name,
        categoryShort:
            item.name.length > 8 ? item.name.substring(0, 8) + '...' : item.name,
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
        <CardTitle>Top Income by Category</CardTitle>
        <CardDescription>
          {start.format('DD MMM, YYYY')} - {end.format('DD MMM, YYYY')}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 min-h-0">
          {rawData.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                  <EmptyState
                      title="No Income Data"
                      description="No data to display at the moment"
                      icon={TrendingUp}
                  />
              </div>
          ) : (
              <ChartContainer config={chartConfig} className="h-full w-full">
                  <BarChart data={chartData} className="h-full w-full">
                      <CartesianGrid strokeDasharray="3 3"/>
                      <XAxis dataKey="categoryShort" tick={{fontSize: 12}}/>
                      <ChartTooltip
                          content={
                              <ChartTooltipContent
                                  formatter={(value, name, payload) => {
                                      if (name === 'percentage') {
                                          return [
                                              `${user?.preferredCurrency || '$'}${payload.payload.amount.toLocaleString()}`,
                                              `${value}%`,
                                          ];
                                      }
                                      return [value, name];
                                  }}
                                  labelFormatter={(label, payload) => {
                                      if (payload && payload.length > 0) {
                                          return payload[0].payload.category;
                                      }
                                      return label;
                                  }}
                              />
                          }
                      />
                      <Bar dataKey="percentage" fill="hsl(var(--chart-1))"/>
                  </BarChart>
              </ChartContainer>
          )}
      </CardContent>
        {rawData.length > 0 && (
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="text-muted-foreground leading-none">
                    Showing total income by category
                </div>
            </CardFooter>
        )}
    </Card>
  );
}
