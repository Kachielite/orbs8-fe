import {ArrowRightLeft} from 'lucide-react';
import moment from 'moment';
import React from 'react';

import {useAppStore} from '@/core/common/presentation/state/store';
import ExchangeRate from '@/features/accounts/presentation/components/exchange-rate';

function TransactionHeader() {
    const {transactionStartDate, transactionEndDate} = useAppStore();
    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-2 items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg">
                        <ArrowRightLeft className="h-6 w-6 text-white"/>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
                    </div>
                </div>
                <p className="font-normal text-md">
                    Showing transactions for:{' '}
                    <span>
            {moment(transactionStartDate).format('DD MMM, YYYY')} -{' '}
                        {moment(transactionEndDate).format('DD MMM, YYYY')}
          </span>
                </p>
                <ExchangeRate/>
            </div>
        </div>
    );
}

export default TransactionHeader;
