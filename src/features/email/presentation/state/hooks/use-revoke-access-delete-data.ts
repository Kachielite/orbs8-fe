import {useMutation, useQueryClient} from "react-query";
import {toast} from "sonner";

import {revokeAccessAndDeleteDataUseCaseEffect} from "@/features/email/presentation/state/store/effects";

const useRevokeAccessDeleteData = () => {
    const queryClient = useQueryClient();

    const {isLoading, mutateAsync} = useMutation(
        ['revoke-access-delete-data'],
        async () => {
            return revokeAccessAndDeleteDataUseCaseEffect()
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['user'],
                });
                queryClient.invalidateQueries({
                    queryKey: ['sync-status'],
                });
                toast.success('Revoke access and data deleted successfully.');
            },
            onError: (error) => {
                console.error('Error in useRevokeAccessDeleteData:', error);
            }
        }
    )

    return {
        isRevokingAccessAndDeletingData: isLoading,
        revokeAccessAndDeleteDataHandler: mutateAsync,
    }
}

export default useRevokeAccessDeleteData;