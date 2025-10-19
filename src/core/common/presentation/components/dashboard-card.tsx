import {ArrowDownRight, ArrowUpRight, Info, LucideIcon} from 'lucide-react';
import moment from 'moment';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/core/common/presentation/components/ui/card';
import {Tooltip, TooltipContent, TooltipTrigger,} from '@/core/common/presentation/components/ui/tooltip';
import {useAppStore} from "@/core/common/presentation/state/store";

export type DashboardCardData = {
    name: string;
    description: string;
    count: number | string;
    icon: LucideIcon;
    prefix?: string;
    change?: number;
    metricType?: 'income' | 'spend';
    valueColorType?: 'balance' | 'neutral';
    tooltip?: string;
};

function DashboardCard({card}: { card: DashboardCardData }) {
    const {dashboardStartDate, dashboardEndDate} = useAppStore();
    const isPositiveGood = card.metricType === 'income';
    const isPositiveBad = card.metricType === 'spend';
    const changeColor =
        card.change !== undefined
            ? (card.change > 0 && isPositiveGood) ||
            (card.change < 0 && isPositiveBad)
                ? 'text-green-600'
                : (card.change > 0 && isPositiveBad) ||
                (card.change < 0 && isPositiveGood)
                    ? 'text-red-600'
                    : 'text-muted-foreground'
            : 'text-muted-foreground';
    const valueColor =
        card.valueColorType === 'balance' && typeof card.count === 'number'
            ? card.count > 0
                ? 'text-green-600'
                : 'text-red-600'
            : '';

    // Calculate the time period text
    const getTimePeriodText = () => {
        const start = moment(dashboardStartDate);
        const end = moment(dashboardEndDate);
        const daysDiff = end.diff(start, 'days');

        if (daysDiff <= 7) return 'previous 7 days';
        if (daysDiff <= 14) return 'previous 14 days';
        if (daysDiff <= 30) return 'previous 30 days';
        if (daysDiff <= 60) return 'previous 60 days';
        if (daysDiff <= 120) return 'previous 120 days';
        if (daysDiff <= 365) return 'previous year';
        return 'previous period';
    };

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle className="text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            {card.name}
              {card.tooltip ? (
                  <Tooltip>
                      <TooltipTrigger asChild>
                          <button
                              type="button"
                              aria-label="How this is calculated"
                              className="inline-flex items-center text-muted-foreground hover:text-foreground"
                          >
                              <Info className="h-4 w-4"/>
                          </button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                          <div className="max-w-xs text-left text-xs">
                              {card.tooltip}
                          </div>
                      </TooltipContent>
                  </Tooltip>
              ) : null}
          </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row justify-between items-center gap-4">
                <CardDescription
                    className={`text-2xl text-foreground font-semibold tabular-nums @[250px]/card:text-3xl ${valueColor}`}
                >
                    {card.prefix || ''}{' '}
                    {typeof card.count === 'number'
                        ? card.count.toLocaleString('en-US')
                        : card.count}
                </CardDescription>
                <card.icon size={32} className="text-foreground"/>
            </CardContent>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                {card.change !== undefined ? (
                    <p className="text-muted-foreground flex items-center gap-1">
                        {card.change > 0 ? (
                            <ArrowUpRight className={`h-3 w-3 ${changeColor}`}/>
                        ) : (
                            <ArrowDownRight className={`h-3 w-3 ${changeColor}`}/>
                        )}
                        <span className={changeColor}>
                            {card.change === 0
                                ? `No change in ${getTimePeriodText()}`
                                : `${Math.abs(card.change).toFixed(1)}% from ${getTimePeriodText()}`
                            }
                        </span>
                    </p>
                ) : (
                    <div className="text-muted-foreground">{card.description}</div>
                )}
            </CardFooter>
        </Card>
    );
}

export default DashboardCard;
