import React from 'react';

import { IMAGES } from '@/core/constants/images.constants';
import FormLayout from '@/features/authentication/presentation/components/form.layout';
import ResetPasswordForm from '@/features/authentication/presentation/components/reset-password.form';

function ResetPasswordPage() {
  return (
    <FormLayout image={IMAGES.RESET_PASSWORD} form={<ResetPasswordForm />} />
  );
}

export default ResetPasswordPage;
