import {useQuery} from 'react-query';

import {useAppStore} from '@/core/common/presentation/state/store';
import {getCurrenciesEffect} from '@/features/currency/presentation/state/store/effects';

const useGetCurrencies = () => {
    const {setCurrencies} = useAppStore();

    const {isLoading, isRefetching, isFetching} = useQuery(
        'getCurrencies',
        async () => {
            return getCurrenciesEffect();
        },
        {
            onSuccess: data => {
                setCurrencies(data);
            },
        }
    );

    return {
        isFetchingCurrencies: isLoading || isRefetching || isFetching,
    };
};

export default useGetCurrencies;
