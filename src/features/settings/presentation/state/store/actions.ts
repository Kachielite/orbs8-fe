import {StateCreator} from "zustand/vanilla";

import {SettingsSlice} from "@/features/settings/presentation/state/store/types";

export const createSettingsActions: StateCreator<SettingsSlice, [], [], Pick<SettingsSlice, 'setActiveOption'>> = set => ({
    setActiveOption: (option: string) => set({activeOption: option}),
});