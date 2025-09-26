import {UserSlice} from "@/features/user/presentation/state/store/types";

export const initialUserState: Pick<UserSlice, 'user'> = {
    user: null,
}