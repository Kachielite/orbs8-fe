import {Landmark} from 'lucide-react';
import React from 'react';

function AccountHeader() {
    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-2 items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg">
                        <Landmark className="h-6 w-6 text-white"/>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Accounts</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountHeader;
