import {Mail, MessageCircleQuestionMark, Palette, ShieldCheck, User,} from 'lucide-react';
import React from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/core/common/presentation/components/ui/select';
import {useIsMobile} from '@/core/common/presentation/state/hooks/use-mobile';
import {useAppStore} from '@/core/common/presentation/state/store';
import {cn} from '@/core/lib/utils';

const SETTINGS_OPTIONS_ICONS = {
    Profile: User,
    Security: ShieldCheck,
    'Connected Accounts': Mail,
    Appearances: Palette,
    'Help & Feedback': MessageCircleQuestionMark,
};

function SettingsOptionMobile() {
    const {settingsOptions, activeSettingsOption, setActiveSettingsOption} =
        useAppStore();
    return (
        <Select
            value={activeSettingsOption}
            onValueChange={setActiveSettingsOption}
        >
            <SelectTrigger className="w-full">
                <SelectValue defaultValue={activeSettingsOption}/>
            </SelectTrigger>
            <SelectContent>
                {settingsOptions.map(s => {
                    const IconComponent =
                        SETTINGS_OPTIONS_ICONS[s as keyof typeof SETTINGS_OPTIONS_ICONS] ||
                        User;
                    return (
                        <SelectItem key={s} value={s}>
                            <div key={s} className="flex items-center gap-2">
                                <IconComponent className="h-4 w-4"/>
                                <span>{s}</span>
                            </div>
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
}

function SettingsOptionDesktop() {
    const {settingsOptions, activeSettingsOption, setActiveSettingsOption} =
        useAppStore();

    return (
        <div className="w-56 flex flex-col justify-start gap-2.5">
            {settingsOptions.map(s => {
                const IconComponent =
                    SETTINGS_OPTIONS_ICONS[s as keyof typeof SETTINGS_OPTIONS_ICONS] ||
                    User;

                return (
                    <button
                        onClick={() => setActiveSettingsOption(s)}
                        key={s}
                        className={cn(
                            'flex items-center gap-2 p-2 py-1.5 cursor-pointer',
                            activeSettingsOption === s &&
                            'bg-sidebar-accent text-sidebar-accent-foreground rounded-md'
                        )}
                    >
                        <IconComponent className="h-4 w-4"/>
                        <span>{s}</span>
                    </button>
                );
            })}
        </div>
    );
}

function SettingsOptions() {
    const isMobile = useIsMobile();

    if (isMobile) {
        return <SettingsOptionMobile/>;
    }

    return <SettingsOptionDesktop/>;
}

export default SettingsOptions;
