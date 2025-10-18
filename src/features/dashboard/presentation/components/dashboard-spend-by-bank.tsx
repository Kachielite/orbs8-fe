"use client"

import moment from "moment/moment";
import {Bar, BarChart, XAxis, YAxis} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/core/common/presentation/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/core/common/presentation/components/ui/chart"
import {Skeleton} from "@/core/common/presentation/components/ui/skeleton";
import {useAppStore} from "@/core/common/presentation/state/store";
import useDashboardTransactionsByBank
    from "@/features/dashboard/presentation/state/hooks/use-dashboard-transactions-by-bank";

const chartConfig = {
  visitors: {
    label: "Amount",
  },
} satisfies ChartConfig

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

    const {dashboardSpendingByBanks, dashboardEndDate, dashboardStartDate} = useAppStore();
    const {isGettingTransactionsByBank} = useDashboardTransactionsByBank();

    const grouped = dashboardSpendingByBanks?.reduce((acc, item) => {
      const bank = item.bankName;
      if (!acc[bank]) {
        acc[bank] = 0;
      }
      acc[bank] += item.transactions.reduce((total, transaction) => total + transaction.amount, 0);
      return acc;
    }, {} as Record<string, number>) || {};

    const chartData = Object.keys(grouped).map(bank => ({
      browser: bank,
      visitors: grouped[bank],
      fill: `var(--chart-${(Object.keys(grouped).indexOf(bank) % 5) + 1})`,
    }));

    if (isGettingTransactionsByBank) {
      return <BarChartLoader />;
    }
      const start = moment(dashboardStartDate);
  const end = moment(dashboardEndDate);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spend by Bank</CardTitle>
        <CardDescription>
          {start.format('DD MMM, YYYY')} - {end.format('DD MMM, YYYY')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={2}
              axisLine={false}
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              cursor
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" layout="vertical" radius={2} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm w-full">
        <div className="text-muted-foreground leading-none w-full text-center">
          Showing spend by bank
        </div>
      </CardFooter>
    </Card>
  )
}
