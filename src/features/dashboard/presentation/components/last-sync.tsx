import moment from 'moment';
import React from 'react';

import {Skeleton} from '@/core/common/presentation/components/ui/skeleton';
import {useAppStore} from '@/core/common/presentation/state/store';
import useGetSyncStatus from '@/features/email/presentation/state/hooks/use-get-sync-status';

function LastSync() {
    const {syncStatus} = useAppStore();
    const {isGettingEmailSyncStatus} = useGetSyncStatus();

    const lastSync = syncStatus?.lastSyncAt || 'Never';

    if (isGettingEmailSyncStatus) {
        return <Skeleton className="h-4 w-24"/>;
    }

    return (
        <span className="text-xs text-muted-foreground">
      Last sync:{' '}
            {lastSync === 'Never'
                ? 'Never'
                : moment(lastSync).format('MMM DD, YYYY HH:mm')}
    </span>
    );
}

export default LastSync;
