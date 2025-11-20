import {Settings} from 'lucide-react';
import React from 'react';

function SettingsHeader() {
    return (
        <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-2 items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg">
                        <Settings className="h-6 w-6 text-white"/>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2"></div>
            </div>
        </div>
    );
}

export default SettingsHeader;
