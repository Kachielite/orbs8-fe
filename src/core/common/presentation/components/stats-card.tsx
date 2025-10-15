import { LucideIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/common/presentation/components/ui/card';

export type StatsCardData = {
  name: string;
  description: string;
  count: number | string;
  icon: LucideIcon;
};

function StatsCard({ card }: { card: StatsCardData }) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="text-muted-foreground">{card.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row justify-between items-center gap-4">
        <CardDescription className="text-2xl text-foreground font-semibold tabular-nums @[250px]/card:text-3xl">
          {typeof card.count === 'number'
            ? card.count.toLocaleString('en-US')
            : card.count}
        </CardDescription>
        <card.icon size={32} className="text-foreground" />
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">{card.description}</div>
      </CardFooter>
    </Card>
  );
}

export default StatsCard;
