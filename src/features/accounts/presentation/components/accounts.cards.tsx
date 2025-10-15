import {FileUser, Landmark, Wallet} from "lucide-react";
import React from 'react'

import CardsContainerLayout from "@/core/common/presentation/components/layouts/cards-container.layout";
import StatsCard, {StatsCardData} from "@/core/common/presentation/components/stats-card";
import {useAppStore} from "@/core/common/presentation/state/store";
import useGetAccountSummary from "@/features/accounts/presentation/state/hooks/use-get-account-summary";

function AccountsCards() {
    const {accountSummary} = useAppStore();
    const {isGettingAccountSummary} = useGetAccountSummary();

    const cardData:StatsCardData[] = [
        {
            name: 'Total Balance',
            description: 'Balance across all accounts',
            count: `${accountSummary?.totalBalance}`,
            icon: Wallet,
        },
        {
            name: 'Number of Accounts',
            description: 'Total linked accounts',
            count: accountSummary?.numberOfAccounts || 0,
            icon: FileUser
        },
        {
            name: 'Number of Banks',
            description: 'Unique banks in your accounts',
            count: accountSummary?.numberOfBanks || 0,
            icon: Landmark,
        }
    ]

    return (
        <CardsContainerLayout isLoading={isGettingAccountSummary} numberOfCards={4}>
            {cardData.map((card, index) => <StatsCard key={index} card={card}/>)}
        </CardsContainerLayout>
    )
}

export default AccountsCards
