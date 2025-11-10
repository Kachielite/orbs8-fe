import {Receipt} from 'lucide-react';
import moment from 'moment';
import React from 'react';
import {useNavigate} from 'react-router-dom';

import EmptyState from '@/core/common/presentation/components/empty-state';
import TableSkeleton from '@/core/common/presentation/components/loaders/table-skeleton';
import {Button} from '@/core/common/presentation/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle,} from '@/core/common/presentation/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/core/common/presentation/components/ui/table';
import {useAppStore} from '@/core/common/presentation/state/store';
import useDashboardRecentTransactions
    from '@/features/dashboard/presentation/state/hooks/use-dashboard-recent-transactions';

function RecentTransactions() {
    const {dashboardRecentTransactions: recentTransactions} = useAppStore();
    const {isGettingTransactions} = useDashboardRecentTransactions();
    const navigate = useNavigate();

    if (isGettingTransactions) {
        return <TableSkeleton rows={10} columns={6}/>;
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Recent Transactions</CardTitle>
                {recentTransactions && recentTransactions.length > 0 && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/transactions')}
                    >
                        See All
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                {recentTransactions?.length === 0 ? (
                    <div className="flex items-center justify-center h-64">
                        <EmptyState
                            title="No Recent Transactions"
                            description="No transactions to display at the moment"
                            icon={Receipt}
                        />
                    </div>
                ) : (
                    <Table className="border border-spacing-0">
                        <TableHeader>
                            <TableRow noHover className="bg-primary">
                                <TableHead className="border-r text-center text-white">
                                    Date
                                </TableHead>
                                <TableHead className="border-r text-center text-white">
                                    Description
                                </TableHead>
                                <TableHead className="border-r text-center text-white">
                                    Category
                                </TableHead>
                                <TableHead className="border-r text-center text-white">
                                    Bank
                                </TableHead>
                                <TableHead className="border-r text-center text-white">
                                    Amount
                                </TableHead>
                                <TableHead className="text-center text-white">Type</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentTransactions?.map(tx => (
                                <TableRow key={tx.id}>
                                    <TableCell className="font-medium border-r text-center">
                                        {moment(tx.transactionDate).format('DD MMMM, YYYY')}
                                    </TableCell>
                                    <TableCell
                                        className="max-w-[200px] truncate border-r text-center"
                                        title={tx.description}
                                    >
                                        {tx.description}
                                    </TableCell>
                                    <TableCell className="border-r text-center">
                                        {tx.category}
                                    </TableCell>
                                    <TableCell className="border-r text-center">
                                        {tx.bank}
                                    </TableCell>
                                    <TableCell
                                        className={`font-semibold border-r text-center ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}
                                    >
                                        ${(tx.amount || 0).toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${tx.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {tx.type}
                    </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}

export default RecentTransactions;
