import React from 'react';
import { Link } from 'react-router-dom';

import CustomInput from '@/core/common/presentation/components/forms/custom-input';
import { Button } from '@/core/common/presentation/components/ui/button';
import useRegister from '@/features/authentication/presentation/state/hooks/use-register';

function RegisterForm() {
  const { registerForm, registerHandler, isRegistering } = useRegister();
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={registerForm.handleSubmit(data => registerHandler(data))}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account 👋</h1>
      </div>
      <div className="grid gap-6">
        <CustomInput
          id="name"
          formController={registerForm}
          label="Name"
          placeholder="Enter your name"
        />
        <CustomInput
          id="email"
          type="email"
          formController={registerForm}
          label="Email"
          placeholder="Enter your email"
        />
        <CustomInput
          id="password"
          formController={registerForm}
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <CustomInput
          id="confirmPassword"
          formController={registerForm}
          label="Confirm Password"
          placeholder="Renter your password"
          type="password"
        />
        <Button type="submit" className="w-full" disabled={isRegistering}>
          {isRegistering ? 'Creating account...' : 'Create account'}
        </Button>
      </div>
      <div className="text-center text-sm">
        Have an account?{' '}
        <Link to="/login" className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </form>
  );
}

export default RegisterForm;
