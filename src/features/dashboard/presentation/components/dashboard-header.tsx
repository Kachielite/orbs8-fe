import moment from 'moment';
import React from 'react';

import {SyncStatusEnum} from '@/core/common/domain/entity/enum/sync-status.enum';
import {Badge} from '@/core/common/presentation/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/core/common/presentation/components/ui/select';
import {Skeleton} from '@/core/common/presentation/components/ui/skeleton';
import {useAppStore} from '@/core/common/presentation/state/store';
import ExchangeRate from '@/features/accounts/presentation/components/exchange-rate';
import useGetSyncStatus from '@/features/email/presentation/state/hooks/use-get-sync-status';

function DashboardHeader() {
    const {setDashboardStartDate, setDashboardEndDate, syncStatus} =
        useAppStore();
    const {isGettingEmailSyncStatus} = useGetSyncStatus();

    const status = syncStatus?.syncStatus || SyncStatusEnum.IDLE;
    const lastSync = syncStatus?.lastSyncAt || 'Never';

    const getSyncStatusColor = (status: string) => {
        switch (status) {
            case SyncStatusEnum.IN_PROGRESS:
            case 'in_progress':
                return 'bg-yellow-500';
            case SyncStatusEnum.COMPLETED:
            case 'completed':
                return 'bg-green-500';
            case SyncStatusEnum.FAILED:
            case 'failed':
                return 'bg-red-500';
            case SyncStatusEnum.PENDING:
            case 'pending':
                return 'bg-blue-500';
            case SyncStatusEnum.IDLE:
            case 'idle':
            default:
                return 'bg-gray-500';
        }
    };

    const getSyncStatusDisplay = (status: string) => {
        switch (status) {
            case SyncStatusEnum.IDLE:
            case 'idle':
                return 'Idle';
            case SyncStatusEnum.PENDING:
            case 'pending':
                return 'Pending';
            case SyncStatusEnum.IN_PROGRESS:
            case 'in_progress':
                return 'Syncing';
            case SyncStatusEnum.COMPLETED:
            case 'completed':
                return 'Synced';
            case SyncStatusEnum.FAILED:
            case 'failed':
                return 'Error';
            default:
                return 'Unknown';
        }
    };

    const handleTimeRangeChange = (value: string) => {
        const today = moment();
        let startDate: moment.Moment;

        switch (value) {
            case '7':
                startDate = today.clone().subtract(7, 'days');
                break;
            case '14':
                startDate = today.clone().subtract(14, 'days');
                break;
            case '30':
                startDate = today.clone().subtract(30, 'days');
                break;
            case '60':
                startDate = today.clone().subtract(60, 'days');
                break;
            case '120':
                startDate = today.clone().subtract(120, 'days');
                break;
            case '365':
                startDate = today.clone().subtract(1, 'year');
                break;
            default:
                startDate = today.clone().subtract(30, 'days');
        }

        setDashboardStartDate(startDate.format('YYYY-MM-DD'));
        setDashboardEndDate(today.format('YYYY-MM-DD'));
    };

    return (
        <div className="flex flex-wrap flex-row items-center justify-between gap-4">
            <div className="flex flex-row items-center gap-4">
                <Badge
                    variant="secondary"
                    className="flex items-center gap-1 text-sm px-3 py-1 font-medium
                       rounded-2xl shadow-sm bg-white/10 backdrop-blur-sm
                       border border-white/20 hover:shadow-md transition-all"
                >
                    <span className="text-xs text-muted-foreground">Sync Status:</span>
                    <div className="flex items-center gap-2">
                        {isGettingEmailSyncStatus ? (
                            <>
                                <Skeleton className="w-3 h-3 rounded-full"/>
                                <Skeleton className="h-4 w-16"/>
                            </>
                        ) : (
                            <>
                                <div
                                    className={`w-3 h-3 rounded-full ${getSyncStatusColor(status)}`}
                                ></div>
                                <span className="text-xs font-medium">
                  {getSyncStatusDisplay(status)}
                </span>
                            </>
                        )}
                    </div>
                </Badge>
                <Badge
                    variant="secondary"
                    className="flex items-center gap-1 text-sm px-3 py-1 font-medium
                       rounded-2xl shadow-sm bg-white/10 backdrop-blur-sm
                       border border-white/20 hover:shadow-md transition-all"
                >
                    <span className="text-xs text-muted-foreground">Last Sync:</span>
                    {isGettingEmailSyncStatus ? (
                        <Skeleton className="h-4 w-24"/>
                    ) : (
                        <span className="text-xs">
              {lastSync === 'Never'
                  ? 'Never'
                  : moment(lastSync).format('MMM DD, YYYY HH:mm')}
            </span>
                    )}
                </Badge>
                <ExchangeRate/>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">Time Range:</span>
                <Select onValueChange={handleTimeRangeChange} defaultValue="30">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select time range"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7">Last 7 days</SelectItem>
                        <SelectItem value="14">Last 14 days</SelectItem>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="60">Last 60 days</SelectItem>
                        <SelectItem value="120">Last 120 days</SelectItem>
                        <SelectItem value="365">Last one year</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default DashboardHeader;
