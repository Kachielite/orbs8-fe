import React from 'react';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/common/presentation/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/core/common/presentation/components/ui/button';

function TransparencyConsentStep({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  return (
    <>
      <CardHeader className="flex flex-col gap-4 text-center items-center mb-6">
        <ShieldCheck size={64} className="text-primary" />
        <CardTitle className="text-2xl lg:text-3xl">Before we begin…</CardTitle>
        <CardDescription className="text-muted-foreground text-sm lg:text-lg w-full text-balance">
          OrbS8 needs Gmail access to detect subscription emails. We only read
          from the filter you set — no personal emails are ever stored.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm lg:text-base">
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-left">
          <li>✅ Only reads subscription emails</li>
          <li>✅ No email bodies stored</li>
          <li>✅ You can revoke access anytime</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => setStep(1)}>
          Continue
        </Button>
      </CardFooter>
    </>
  );
}

export default TransparencyConsentStep;
