import React from 'react';

import { IMAGES } from '@/core/constants/images.constants';
import FormLayout from '@/features/authentication/presentation/components/form.layout';
import LoginForm from '@/features/authentication/presentation/components/login.form';

function LoginPage() {
  return <FormLayout image={IMAGES.REGISTER} form={<LoginForm />} />;
}

export default LoginPage;
