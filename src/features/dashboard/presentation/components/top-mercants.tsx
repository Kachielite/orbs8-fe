import React from 'react';

import SmallTableLoader from '@/core/common/presentation/components/loaders/small-table-loader';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/core/common/presentation/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/core/common/presentation/components/ui/table';
import {useAppStore} from '@/core/common/presentation/state/store';
import useDashboardTransactionsByBank
    from '@/features/dashboard/presentation/state/hooks/use-dashboard-transactions-by-bank';

function TopMerchants() {
    const {dashboardTransactionsSummary} = useAppStore();
    const {isGettingTransactionsByBank} = useDashboardTransactionsByBank();

    if (isGettingTransactionsByBank) {
        return <SmallTableLoader rows={5} columns={4}/>;
    }

    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>Top Transactions</CardTitle>
                <CardDescription>
                    Most frequent transaction destinations
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">% of Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dashboardTransactionsSummary?.topMerchants.map(merchant => (
                            <TableRow key={merchant.name}>
                                <TableCell
                                    className="font-medium max-w-[200px] truncate"
                                    title={merchant.name}
                                >
                                    {merchant.name}
                                </TableCell>
                                <TableCell className="text-right">
                                    ${merchant.amount.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    {merchant.percentage}%
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default TopMerchants;
