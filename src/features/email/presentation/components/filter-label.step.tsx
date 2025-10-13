import { Mail } from 'lucide-react';
import React from 'react';

import CustomInput from '@/core/common/presentation/components/forms/custom-input';
import { Button } from '@/core/common/presentation/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/common/presentation/components/ui/card';
import useVerifyEmailLabel from '@/features/email/presentation/state/hooks/use-verify-email-label';

function FilterLabelStep() {
  const { emailLabelForm, verifyEmailLabelAccessHandler, verifyingAccess } =
    useVerifyEmailLabel();

  return (
    <>
      <CardHeader className="flex flex-col gap-4 text-center items-center mb-6">
        <Mail size={64} className="text-primary" />
        <CardTitle className="text-2xl lg:text-3xl">
          Choose Your Filter Label
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm lg:text-lg w-full text-balance">
          To protect your privacy, OrbS8 only reads emails from the Gmail label
          you define. Create a filter in Gmail for{' '}
          <strong>bank alert messages</strong> and apply a label.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm lg:text-base items-start w-full">
        <p className="font-medium">Filter Rules You Should Use:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>
            <span className="font-medium">Subject contains:</span>{' '}
            &quot;transaction&quot; OR &quot;payment&quot; OR
            &quot;deposit&quot; OR &quot;withdrawal&quot; OR
            &quot;transfer&quot;
          </li>
          <li>
            <span className="font-medium">Has the words:</span>{' '}
            &quot;debit&quot; OR &quot;credit&quot;
          </li>
          <li>
            <span className="font-medium">Label:</span> Enter below (e.g.{' '}
            <code className="px-1 py-0.5 rounded bg-muted">Transactions</code>)
          </li>
          <li>
            <span className="font-medium">Important:</span> Check the box that
            says{' '}
            <span className="text-primary">
              &quot;Also apply filter to matching conversations&quot;
            </span>{' '}
            to ensure all relevant emails are properly labeled
          </li>
        </ul>
        <div className="w-full">
          <CustomInput
            id="labelName"
            formController={emailLabelForm}
            placeholder="Enter Gmail Label Name (e.g. Transactions)"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 w-full">
        <Button
          className="w-full"
          onClick={emailLabelForm.handleSubmit(data =>
            verifyEmailLabelAccessHandler(data)
          )}
          disabled={verifyingAccess}
        >
          {verifyingAccess ? 'Verifying...' : 'Verify & Sync'}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Need help?{' '}
          <a
            href="https://support.google.com/mail/answer/6579?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Learn how to create a Gmail filter
          </a>
        </p>
      </CardFooter>
    </>
  );
}

export default FilterLabelStep;
