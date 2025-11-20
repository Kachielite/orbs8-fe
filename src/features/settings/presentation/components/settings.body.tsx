import React, {ReactNode} from 'react';

function SettingsBody({children}: { children: ReactNode }) {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-8 w-full">
            {children}
        </div>
    );
}

export default SettingsBody;
