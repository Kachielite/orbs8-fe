import React, {useState} from 'react';
import {Card} from "@/core/common/presentation/components/ui/card";
import LinkStepIndicator from "@/features/email/presentation/components/link-step-indicator";
import TransparencyConsentStep from "@/features/email/presentation/components/transparency-consent.step";
import ConnectGmailStep from "@/features/email/presentation/components/connect-gmail.step";
import FilterLabelStep from "@/features/email/presentation/components/filter-label.step";
import FinalLinkStep from "@/features/email/presentation/components/final-link.step";

function LinkEmailPage() {
    const [step, setStep] = useState(0);
  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl p-4 items-center">
        <Card className="w-full max-w-md">
            <LinkStepIndicator step={step}/>
            {step === 0 && (<TransparencyConsentStep setStep={setStep} />)}
            {step === 1 && (<ConnectGmailStep setStep={setStep} />)}
            {step === 2 && (<FilterLabelStep setStep={setStep} />)}
            {step === 3 && (<FinalLinkStep />)}

        </Card>
    </div>
  );
}

export default LinkEmailPage;
