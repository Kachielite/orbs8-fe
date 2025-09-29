import React from 'react';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/common/presentation/components/ui/card';
import { Mail } from 'lucide-react';
import { Button } from '@/core/common/presentation/components/ui/button';
import useSyncEmail from '@/features/email/presentation/state/hooks/use-sync-email';
import CustomInput from '@/core/common/presentation/components/forms/custom-input';

function FilterLabelStep() {
  const { syncEmailForm, isSyncingEmail, syncEmailHandler } = useSyncEmail();

  return (
    <>
      <CardHeader className="flex flex-col gap-4 text-center items-center mb-6">
        <Mail size={64} className="text-primary" />
        <CardTitle className="text-2xl lg:text-3xl">
          Choose Your Filter Label
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm lg:text-lg w-full text-balance">
          To protect your privacy, OrbS8 only reads emails from the Gmail label
          you define. Create a filter in Gmail and apply a label.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 text-sm lg:text-base items-start w-full">
        <p className="font-medium">Filter Rules You Should Use:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>
            <span className="font-medium">Subject contains:</span> "transaction"
            OR "payment" OR "deposit" OR "withdrawal" OR "transfer"
          </li>
          <li>
            <span className="font-medium">Has the words:</span> "debit" OR
            "credit"
          </li>
          <li>
            <span className="font-medium">Label:</span> Enter below (e.g.{' '}
            <code className="px-1 py-0.5 rounded bg-muted">Transactions</code>)
          </li>
          <li>
            <span className="font-medium">Important:</span> Check the box that
            says{' '}
            <span className="text-primary">
              "Also apply filter to matching conversations"
            </span>{' '}
            to ensure all relevant emails are properly labeled
          </li>
        </ul>
        <div className="w-full">
          <CustomInput
            id="labelName"
            formController={syncEmailForm}
            placeholder="Enter Gmail Label Name (e.g. Transactions)"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 w-full">
        <Button
          className="w-full"
          onClick={syncEmailForm.handleSubmit(data => syncEmailHandler(data))}
          disabled={isSyncingEmail}
        >
          {isSyncingEmail ? 'Processing...' : ' Proceed & Start Sync'}
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
