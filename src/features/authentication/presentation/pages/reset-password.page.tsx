import React from 'react';

import { IMAGES } from '@/core/constants/images.constants';
import FormLayout from '@/features/authentication/presentation/components/form.layout';
import ResetPasswordForm from '@/features/authentication/presentation/components/reset-password.form';
import useVerifyPasswordResetToken from '@/features/authentication/presentation/state/hooks/use-verify-password-reset-token';

function ResetPasswordPage() {
  const { isVerifyingPassword } = useVerifyPasswordResetToken();

  if (isVerifyingPassword) {
    return <div>Verifying password reset token...</div>;
  }

  return (
    <FormLayout image={IMAGES.RESET_PASSWORD} form={<ResetPasswordForm />} />
  );
}

export default ResetPasswordPage;
