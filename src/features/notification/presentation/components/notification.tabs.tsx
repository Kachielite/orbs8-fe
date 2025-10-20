import React, {useState} from 'react';

import {Tabs, TabsList, TabsTrigger,} from '@/core/common/presentation/components/ui/tabs';

function NotificationTabs({
                              handleUpdateQuery,
                          }: {
    handleUpdateQuery: (type: string, value: boolean | number | undefined) => void;
}) {
    const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

    const handleTabChange = (value: string) => {
        if (value === 'all') {
            handleUpdateQuery('isRead', undefined);
            setActiveTab('all');
        } else if (value === 'unread') {
            handleUpdateQuery('isRead', false);
            setActiveTab('unread');
        }
    }

    return (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}

export default NotificationTabs;
