import {CreditCard} from 'lucide-react';
import React from 'react';

import EmptyState from '@/core/common/presentation/components/empty-state';
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

function AccountSummary() {
    const {dashboardTransactionsSummary} = useAppStore();
    const {isGettingTransactionsByBank} = useDashboardTransactionsByBank();

    if (isGettingTransactionsByBank) {
        return <SmallTableLoader rows={5} columns={4}/>;
    }

    const accountSummaries = dashboardTransactionsSummary?.accountSummaries || [];

    if (accountSummaries.length === 0) {
        return (
            <Card className="flex flex-col h-full">
                <CardHeader>
                    <CardTitle>Account Summaries</CardTitle>
                    <CardDescription>Overview of all accounts</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                    <EmptyState
                        title="No account summaries available"
                        description="There is no account summary available at the moment."
                        icon={CreditCard}
                    />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>Account Summaries</CardTitle>
                <CardDescription>Overview of all accounts</CardDescription>
            </CardHeader>
            <CardContent>
                <Table className="border border-spacing-0">
                    <TableHeader className="bg-primary">
                        <TableRow>
                            <TableHead className="text-center border-r text-white">
                                Account
                            </TableHead>
                            <TableHead className="text-center border-r text-white">
                                Spend
                            </TableHead>
                            <TableHead className="text-center border-r text-white">
                                Income
                            </TableHead>
                            <TableHead className="text-center border-r text-white">
                                Balance
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {accountSummaries.map(account => (
                            <TableRow key={account.accountName}>
                                <TableCell className="font-medium text-center border-r">
                                    {account.accountName}
                                </TableCell>
                                <TableCell className="text-center border-r text-red-600">
                                    ${account.totalSpend.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-center border-r text-green-600">
                                    ${(account.totalIncome || 0).toLocaleString()}
                                </TableCell>
                                <TableCell className="text-center border-r font-semibold">
                                    ${account.currentBalance.toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default AccountSummary;
