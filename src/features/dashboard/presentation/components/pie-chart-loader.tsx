import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/common/presentation/components/ui/card';
import { Skeleton } from '@/core/common/presentation/components/ui/skeleton';

export function PieChartLoader() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          <Skeleton className="h-6 w-32" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-[500px] flex items-center justify-center">
          <Skeleton className="h-[400px] w-[400px] rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <Skeleton className="h-4 w-48" />
      </CardFooter>
    </Card>
  );
}
