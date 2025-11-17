import React from 'react';

import {useAppStore} from '@/core/common/presentation/state/store';
import {SettingsProfile} from '@/features/settings/presentation/components/settings.profile';

function SettingsActiveOption() {
    const {activeSettingsOption} = useAppStore();

    if (activeSettingsOption === 'Profile') {
        return <SettingsProfile/>;
    }

    return <div>SettingsActiveOption</div>;
}

export default SettingsActiveOption;
