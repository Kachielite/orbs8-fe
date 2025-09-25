import React from 'react';

import CustomInput from '@/core/common/presentation/components/forms/custom-input';
import { Button } from '@/core/common/presentation/components/ui/button';
import useRequestPasswordReset from '@/features/authentication/presentation/state/hooks/use-request-password-reset';

function ForgetPasswordForm() {
  const {
    resetPasswordForm,
    requestPasswordResetHandler,
    isRequestingPasswordRest,
    emailSent,
  } = useRequestPasswordReset();
  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={resetPasswordForm.handleSubmit(data =>
        requestPasswordResetHandler(data)
      )}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          {emailSent
            ? 'Email sent successfully 📧 '
            : 'Recover your password 🔑'}
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          {emailSent
            ? 'Check your email for a reset link'
            : "We'll send you an email to reset your password."}
        </p>
      </div>
      {!emailSent && (
        <div className="grid gap-6">
          <CustomInput
            id="email"
            formController={resetPasswordForm}
            label="Email"
            placeholder="Enter your email"
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isRequestingPasswordRest}
          >
            Send Reset Link
          </Button>
        </div>
      )}
    </form>
  );
}

export default ForgetPasswordForm;
