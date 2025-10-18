import moment from "moment/moment";

import {Badge} from "@/core/common/presentation/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/core/common/presentation/components/ui/card';
import {Progress} from "@/core/common/presentation/components/ui/progress";
import {Skeleton} from "@/core/common/presentation/components/ui/skeleton";
import {useAppStore} from '@/core/common/presentation/state/store';
import useDashboardTransactionsSummary
    from '@/features/dashboard/presentation/state/hooks/use-dashboard-transactions-summary';

export function DashboardSpendByCategory() {
  const { dashboardTransactionsSummary, dashboardStartDate, dashboardEndDate } = useAppStore();
  const { isGettingTransactionSummary } = useDashboardTransactionsSummary();
  const rawData = dashboardTransactionsSummary?.topSpendByCategory || [];
  const total = rawData.reduce((sum, item) => sum + item.amount, 0);
  const sectorData = rawData.map(item => ({
    sectorName: item.name,
    adoptionRatePercentage: total > 0 ? Math.round((item.amount / total) * 100) : 0,
  }));

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
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Spend by Category</CardTitle>
         <CardDescription>
          {start.format('DD MMM, YYYY')} - {end.format('DD MMM, YYYY')}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 min-h-0">
        <div className="space-y-5 pt-4">
          {sectorData.map(item => (
            <div key={item.sectorName} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">
                  {item.sectorName}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {item.adoptionRatePercentage}%
                </Badge>
              </div>
              <Progress value={item.adoptionRatePercentage} className="h-2" />
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



