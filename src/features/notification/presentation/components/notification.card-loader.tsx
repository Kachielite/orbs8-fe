import {Card} from '@/core/common/presentation/components/ui/card';
import {Skeleton} from '@/core/common/presentation/components/ui/skeleton';

interface NotificationCardLoaderProps {
    count?: number;
}

export const NotificationCardLoader = ({
                                           count = 1,
                                       }: NotificationCardLoaderProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({length: count}, (_, i) => (
                <Card key={i} className="p-4 transition-all hover:shadow-md">
                    <div className="flex items-start gap-4">
                        <Skeleton className="h-9 w-9 rounded-full shrink-0"/>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                                <Skeleton className="h-4 w-3/4"/>
                                <Skeleton className="h-5 w-16 shrink-0"/>
                            </div>
                            <Skeleton className="h-4 w-full mb-2"/>
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-3 w-20"/>
                                <Skeleton className="h-7 w-24"/>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};
