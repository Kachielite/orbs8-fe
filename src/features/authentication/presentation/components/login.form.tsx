import React from 'react';
import { Link } from 'react-router-dom';

import CustomInput from '@/core/common/presentation/components/forms/custom-input';
import { Button } from '@/core/common/presentation/components/ui/button';
import useLogin from '@/features/authentication/presentation/state/hooks/use-login';

function LoginForm() {
  const { loginForm, loginHandler, isLoggingIn } = useLogin();
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome back 👋</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <CustomInput
          id="email"
          formController={loginForm}
          label="Email"
          placeholder="Enter your email"
        />
        <CustomInput
          id="password"
          formController={loginForm}
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <div className="flex items-center">
          <Link
            to="/forget-password"
            className="mx-auto text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoggingIn}
          onClick={() => loginForm.handleSubmit(data => loginHandler(data))()}
        >
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
