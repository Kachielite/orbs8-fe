import {ArrowRightLeft} from "lucide-react";
import React from 'react'

import ExchangeRate from "@/features/accounts/presentation/components/exchange-rate";

function TransactionHeader() {
    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-2 items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <ArrowRightLeft className="h-6 w-6"/>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Transactions
                        </h1>
                    </div>
                </div>
                <ExchangeRate/>
            </div>
        </div>
    )
}

export default TransactionHeader
