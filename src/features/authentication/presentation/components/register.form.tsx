import React from 'react';
import {Link} from 'react-router-dom';

import CustomInput from '@/core/common/presentation/components/forms/custom-input';
import {Button} from '@/core/common/presentation/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/core/common/presentation/components/ui/select';
import {useAppStore} from '@/core/common/presentation/state/store';
import useRegister from '@/features/authentication/presentation/state/hooks/use-register';
import useGetCurrencies from '@/features/currency/presentation/state/hooks/use-get-currencies';

function RegisterForm() {
    const {currencies} = useAppStore();
  const { registerForm, registerHandler, isRegistering } = useRegister();
    useGetCurrencies();

    const currencyCode = registerForm.watch('currencyCode');
    const preferredCurrency = currencies?.find(
        item => item.code === currencyCode
    );
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
          <div className="grid gap-3">
              <p className="text-sm">Preferred Currency</p>
              <Select
                  onValueChange={e => registerForm.setValue('currencyCode', e)}
                  value={registerForm.watch('currencyCode')}
              >
                  <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Preferred Currency">
                          {preferredCurrency
                              ? `${preferredCurrency.name} (${preferredCurrency.code})`
                              : 'Select Preferred Currency'}
                      </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                      {currencies?.map(item => (
                          <SelectItem key={item.id} value={item.code}>
                              {item.name} ({item.code})
                          </SelectItem>
                      ))}
                  </SelectContent>
              </Select>
          </div>
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
