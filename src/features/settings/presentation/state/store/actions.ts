import {StateCreator} from 'zustand/vanilla';

import {SettingsSlice} from '@/features/settings/presentation/state/store/types';

export const createSettingsActions: StateCreator<
    SettingsSlice,
    [],
    [],
    Pick<SettingsSlice, 'setActiveSettingsOption'>
> = set => ({
    setActiveSettingsOption: (option: string) =>
        set({activeSettingsOption: option}),
});
