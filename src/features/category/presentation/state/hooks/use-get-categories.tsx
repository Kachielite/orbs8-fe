import {useQuery} from 'react-query';
import {toast} from 'sonner';

import {useAppStore} from '@/core/common/presentation/state/store';
import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {getCategoriesEffect} from '@/features/category/presentation/state/store/effects';

const useGetCategories = () => {
  const { setCategories } = useAppStore();

  const {
    isLoading: isGettingCategories,
    data: categories,
    error,
  } = useQuery(
    ['categories'],
    async () => {
      return getCategoriesEffect();
    },
    {
      onSuccess: categories => {
        setCategories(categories);
      },
      onError: error => {
        const errorMessage = extractErrorHooks(error, 'useGetCategories');
        toast.error(errorMessage);
      },
    }
  );

  return {
    isGettingCategories,
    categories,
    error,
  };
};

export default useGetCategories;
