import React from 'react';

import SettingsActiveOption from '@/features/settings/presentation/components/settings.active-option';
import SettingsBody from '@/features/settings/presentation/components/settings.body';
import SettingsHeader from '@/features/settings/presentation/components/settings.header';
import SettingsLayout from '@/features/settings/presentation/components/settings.layout';
import SettingsOptions from '@/features/settings/presentation/components/settings.options';

function SettingsPage() {
    return (
        <SettingsLayout>
            <SettingsHeader/>
            <SettingsBody>
                <SettingsOptions/>
                <SettingsActiveOption/>
            </SettingsBody>
        </SettingsLayout>
    );
}

export default SettingsPage;
