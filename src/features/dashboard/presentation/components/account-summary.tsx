import React from 'react'

import SmallTableLoader from "@/core/common/presentation/components/loaders/small-table-loader";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/core/common/presentation/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/core/common/presentation/components/ui/table";
import {useAppStore} from "@/core/common/presentation/state/store";
import useDashboardTransactionsByBank
    from "@/features/dashboard/presentation/state/hooks/use-dashboard-transactions-by-bank";

function AccountSummary() {
    const {dashboardTransactionsSummary,} =
        useAppStore();
    const {isGettingTransactionsByBank} = useDashboardTransactionsByBank();

    if (isGettingTransactionsByBank) {
        return <SmallTableLoader rows={5} columns={4}/>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Summaries</CardTitle>
                <CardDescription>Overview of all accounts</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Account</TableHead>
                            <TableHead className="text-right">Spend</TableHead>
                            <TableHead className="text-right">Income</TableHead>
                            <TableHead className="text-right">Balance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dashboardTransactionsSummary?.accountSummaries.map((account) => (
                            <TableRow key={account.accountName}>
                                <TableCell className="font-medium">{account.accountName}</TableCell>
                                <TableCell
                                    className="text-right text-red-600">${account.totalSpend.toLocaleString()}</TableCell>
                                <TableCell
                                    className="text-right text-green-600">${account.totalIncome.toLocaleString()}</TableCell>
                                <TableCell
                                    className="text-right font-semibold">${account.currentBalance.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default AccountSummary
