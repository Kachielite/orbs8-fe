import React from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/core/common/presentation/components/ui/card';
import {Skeleton} from '@/core/common/presentation/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/core/common/presentation/components/ui/table';

interface SmallTableLoaderProps {
    rows?: number;
    columns?: number;
}

function SmallTableLoader({rows = 5, columns = 4}: SmallTableLoaderProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-6 w-40"/>
                </CardTitle>
                <CardDescription>
                    <Skeleton className="h-4 w-48"/>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {Array.from({length: columns}).map((_, i) => (
                                <TableHead key={i} className={i > 0 ? 'text-right' : ''}>
                                    <Skeleton className="h-4 w-20"/>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({length: rows}).map((_, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {Array.from({length: columns}).map((_, colIndex) => (
                                    <TableCell
                                        key={colIndex}
                                        className={colIndex > 0 ? 'text-right' : ''}
                                    >
                                        <Skeleton
                                            className={`h-4 ${colIndex === 0 ? 'w-32' : 'w-16'}`}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default SmallTableLoader;
