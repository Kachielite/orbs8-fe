import React from 'react';

function SettingOptionHeader({
                                 title,
                                 description,
                             }: {
    title: string;
    description: string;
}) {
    return (
        <div className="flex flex-col gap-1 mb-6 divide-x-[1px] divide-muted-foreground ">
            <p className="text-xl text-foreground font-medium ">{title}</p>
            <p className="text-md text-muted-foreground">{description}</p>
        </div>
    );
}

export default SettingOptionHeader;
