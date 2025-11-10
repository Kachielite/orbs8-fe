import {StateCreator} from "zustand/vanilla";

import {createSettingsActions} from "@/features/settings/presentation/state/store/actions";
import {initialSettingsState} from "@/features/settings/presentation/state/store/state";
import {SettingsSlice} from "@/features/settings/presentation/state/store/types";

export const createSettingsSlice: StateCreator<SettingsSlice> = (
    set, get, store
) => {
    const actions = createSettingsActions(set, get, store);
    return {
        ...initialSettingsState,
        ...actions,
    };
}