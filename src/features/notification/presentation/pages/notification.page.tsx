import React from 'react';

import EmptyState from '@/core/common/presentation/components/empty-state';
import {Button} from '@/core/common/presentation/components/ui/button';
import {ScrollArea} from "@/core/common/presentation/components/ui/scroll-area";
import {useAppStore} from "@/core/common/presentation/state/store";
import {NotificationCard} from "@/features/notification/presentation/components/notification.card";
import {NotificationCardLoader} from "@/features/notification/presentation/components/notification.card-loader";
import NotificationHeader from '@/features/notification/presentation/components/notification.header';
import NotificationTabs from '@/features/notification/presentation/components/notification.tabs';
import useGetNotifications from '@/features/notification/presentation/state/hooks/use-get-notifications';

function NotificationPage() {
    const {isLoadingNotifications, handleUpdateQuery, query} = useGetNotifications();
    const {notifications} = useAppStore();

    const total = notifications?.total ?? 0;
    const currentPage = notifications?.page ?? query.page;
    const limit = notifications?.limit ?? query.limit;
    const totalPages = total === 0 ? 1 : Math.max(1, Math.ceil(total / limit));
    const start = total === 0 ? 0 : (currentPage - 1) * limit + 1;
    const end = Math.min(total, currentPage * limit);

    const goToPrevious = () => handleUpdateQuery('page', Math.max(1, currentPage - 1));
    const goToNext = () => handleUpdateQuery('page', Math.min(totalPages, currentPage + 1));

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <NotificationHeader/>
            <NotificationTabs handleUpdateQuery={handleUpdateQuery}/>
            {isLoadingNotifications ? (
                <NotificationCardLoader count={6}/>
            ) : (
                <>
                    {total === 0 ? (
                        <div className="p-4 flex-1 flex flex-col items-center justify-center">
                            <EmptyState
                                title="No notifications"
                                description="You're all caught up"
                            />
                        </div>
                    ) : (
                        <>
                            <ScrollArea className="h-[calc(95vh-280px)]">
                                {notifications?.data.map(notification => (
                                    <NotificationCard key={notification.id} notification={notification}/>
                                ))}
                            </ScrollArea>

                            {/* Pagination controls */}
                            <div className="flex items-center justify-between mt-2">
                                <div className="text-xs lg:text-sm text-muted-foreground">
                                    {total === 0
                                        ? 'No notifications'
                                        : `Showing ${start} - ${end} of ${total}`}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={goToPrevious}
                                        disabled={currentPage <= 1 || total === 0}
                                    >
                                        Prev
                                    </Button>

                                    <div className="flex items-center space-x-1">
                                        {(() => {
                                            const pageItems: (number | string)[] = [];
                                            const delta = 2;
                                            const left = Math.max(1, currentPage - delta);
                                            const right = Math.min(totalPages, currentPage + delta);

                                            if (left > 1) {
                                                pageItems.push(1);
                                                if (left > 2) pageItems.push('...');
                                            }

                                            for (let p = left; p <= right; p++) pageItems.push(p);

                                            if (right < totalPages) {
                                                if (right < totalPages - 1) pageItems.push('...');
                                                pageItems.push(totalPages);
                                            }

                                            return pageItems.map((p, idx) =>
                                                typeof p === 'number' ? (
                                                    <Button
                                                        key={p}
                                                        variant={p === currentPage ? 'default' : 'outline'}
                                                        size="sm"
                                                        onClick={p === currentPage ? undefined : () => handleUpdateQuery('page', p)}
                                                        aria-current={p === currentPage ? 'page' : undefined}
                                                        tabIndex={p === currentPage ? -1 : 0}
                                                        className={p === currentPage ? 'cursor-default' : ''}
                                                        type="button"
                                                    >
                                                        {p}
                                                    </Button>
                                                ) : (
                                                    <span key={`dot-${idx}`} className="px-2 text-sm">
                                                        {p}
                                                    </span>
                                                )
                                            );
                                        })()}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={goToNext}
                                        disabled={currentPage >= totalPages || total === 0}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default NotificationPage;
