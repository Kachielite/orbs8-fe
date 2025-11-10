import React, {useState} from 'react';

const OPTIONS = ['Profile', 'Security', 'Connected Accounts', 'Appearance', 'Help & Feedback'];


function SettingsOptions() {
    const [activeOption, setActiveOption] = useState<string>(OPTIONS[0]);
    return (
        <div>SettingsOptions</div>
    )
}

export default SettingsOptions
