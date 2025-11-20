export type SettingsSlice = {
    // state
    settingsOptions: string[];
    activeSettingsOption: string;
    // actions
    setActiveSettingsOption: (settingsOptions: string) => void;
};
