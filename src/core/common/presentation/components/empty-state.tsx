import {FolderOpen, LucideIcon} from 'lucide-react';

import {Button} from '@/core/common/presentation/components/ui/button';
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
                               action,
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
            {action && (
                <EmptyContent>
                    <Button onClick={action.onClick}>{action.label}</Button>
                </EmptyContent>
            )}
        </Empty>
    );
}

export default EmptyState;
