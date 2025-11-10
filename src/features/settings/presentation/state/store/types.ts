export type SettingsSlice = {
    // state
    options: string[];
    activeOption: string;
    // actions
    setActiveOption: (option: string) => void;
}