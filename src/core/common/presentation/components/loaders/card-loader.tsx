import {Card, CardDescription, CardFooter, CardHeader, CardTitle,} from '@/core/common/presentation/components/ui/card';
import {Skeleton} from '@/core/common/presentation/components/ui/skeleton';

function CardSkeleton() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>
          <Skeleton className="h-4 w-36" />
        </CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          <Skeleton className="h-8 w-24 @[250px]/card:w-28" />
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <Skeleton className="h-4 w-48" />
      </CardFooter>
    </Card>
  );
}

function CardLoaders({ count = 4 }: Readonly<{ count?: number }>) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <CardSkeleton key={idx} />
      ))}
    </>
  );
}

export default CardLoaders;