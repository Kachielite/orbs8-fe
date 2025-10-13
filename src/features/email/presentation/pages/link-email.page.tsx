import React from 'react';

import {GlobalLoader} from '@/core/common/presentation/components/global-loader';
import {Card} from '@/core/common/presentation/components/ui/card';
import {useAppStore} from '@/core/common/presentation/state/store';
import ConnectGmailStep from '@/features/email/presentation/components/connect-gmail.step';
import FilterLabelStep from '@/features/email/presentation/components/filter-label.step';
import FinalLinkStep from '@/features/email/presentation/components/final-link.step';
import LinkStepIndicator from '@/features/email/presentation/components/link-step-indicator';
import SyncEmailAlert from "@/features/email/presentation/components/sync-email-alert";
import TransparencyConsentStep from '@/features/email/presentation/components/transparency-consent.step';
import useGetToken from '@/features/email/presentation/state/hooks/use-get-token';

function LinkEmailPage() {
  const { step, setStep } = useAppStore();

  const { IsLinkingEmail } = useGetToken();

  if (IsLinkingEmail) {
    return <GlobalLoader show={IsLinkingEmail} />;
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl p-4 items-center">
      <Card className="w-full max-w-md">
        <LinkStepIndicator step={step} />
        {step === 0 && <TransparencyConsentStep setStep={setStep} />}
        {step === 1 && <ConnectGmailStep />}
        {step === 2 && <FilterLabelStep />}
          {step === 3 && <SyncEmailAlert />}
        {step === 4 && <FinalLinkStep />}
      </Card>
    </div>
  );
}

export default LinkEmailPage;
