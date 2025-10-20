import {FolderOpen, LucideIcon} from 'lucide-react';

import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/core/common/presentation/components/ui/empty';

interface EmptyStateProps {
    title?: string;
    description?: string;
    icon?: LucideIcon;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export function EmptyState({
                               title = 'No data available',
                               description = 'There is no data to display at the moment.',
                               icon: Icon = FolderOpen,
                           }: EmptyStateProps) {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Icon/>
                </EmptyMedia>
                <EmptyTitle>{title}</EmptyTitle>
                <EmptyDescription>{description}</EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
}

export default EmptyState;
