import {useQuery} from 'react-query';
import {toast} from 'sonner';

import {useAppStore} from '@/core/common/presentation/state/store';
import {extractErrorHooks} from '@/core/helpers/extract-error-hooks';
import {getCategoryByIdEffect} from '@/features/category/presentation/state/store/effects';

const useGetCategoryById = (id: number) => {
  const { setCategory } = useAppStore();

  const {
    isLoading: isGettingCategory,
    data: category,
    error,
  } = useQuery(
    ['category', id],
    async () => {
      return getCategoryByIdEffect(id);
    },
    {
      enabled: !!id,
      onSuccess: category => {
        setCategory(category);
      },
      onError: error => {
        const errorMessage = extractErrorHooks(error, 'useGetCategoryById');
        toast.error(errorMessage);
      },
    }
  );

  return {
    isGettingCategory,
    category,
    error,
  };
};

export default useGetCategoryById;
