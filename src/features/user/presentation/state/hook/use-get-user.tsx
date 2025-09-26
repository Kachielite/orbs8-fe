import {useAppStore} from "@/core/common/presentation/state/store";
import {useQuery} from "react-query";
import {getUserEffect} from "@/features/user/presentation/state/store/effects";

const useGetUser = () => {
    const {setUser} = useAppStore();

    const {isLoading: isFetchingUser} = useQuery(
        ['user'],
        async () => {
           return getUserEffect();
        },
        {
            onSuccess: (data) => {
                setUser(data);
            }
        }
    );

    return {isFetchingUser};
};

export default useGetUser;