import React from 'react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/core/common/presentation/components/ui/card';

function LinkInstructions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Link your Gmail to OrbS8 </CardTitle>
        <CardDescription>
          We only read from the Gmail filter you choose
          will be accessed.{' '}
        </CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

export default LinkInstructions;
