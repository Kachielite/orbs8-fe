import React from 'react';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/common/presentation/components/ui/card';
import { Cable } from 'lucide-react';
import { Button } from '@/core/common/presentation/components/ui/button';
import useGetOauthUrl from '@/features/email/presentation/state/hooks/use-get-oauth-url';

function ConnectGmailStep() {
  const { isGettingOAuthUrl, getOAuthUrlHandler } = useGetOauthUrl();
  return (
    <>
      <CardHeader className="flex flex-col gap-4 text-center items-center mb-6">
        <Cable size={64} className="text-primary" />
        <CardTitle className="text-2xl lg:text-3xl">
          Connect your Gmail
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm lg:text-lg w-full">
          Authorize OrbS8 to access Gmail (read-only). This allows us to
          securely fetch your <strong>bank notification emails</strong> from the
          label you define — nothing else.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 items-center">
        <Button
          className="w-full"
          onClick={() => getOAuthUrlHandler()}
          disabled={isGettingOAuthUrl}
        >
          {isGettingOAuthUrl ? 'Processing...' : 'Allow Gmail Access'}
        </Button>
      </CardContent>
    </>
  );
}

export default ConnectGmailStep;
