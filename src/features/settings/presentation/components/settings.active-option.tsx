import React from 'react';

import {useAppStore} from '@/core/common/presentation/state/store';
import {SettingsConnectedAccount} from "@/features/settings/presentation/components/settings.connected-accounts";
import {SettingsProfile} from '@/features/settings/presentation/components/settings.profile';

function SettingsActiveOption() {
    const {activeSettingsOption} = useAppStore();

    if (activeSettingsOption === 'Profile') {
        return <SettingsProfile/>;
    }

    if (activeSettingsOption === 'Connected Accounts') {
        return <SettingsConnectedAccount/>
    }

    return <div>SettingsActiveOption</div>;
}

export default SettingsActiveOption;
