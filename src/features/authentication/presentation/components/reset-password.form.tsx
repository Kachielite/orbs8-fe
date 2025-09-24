import React from 'react'
import {Button} from "@/core/common/presentation/components/ui/button";
import CustomInput from "@/core/common/presentation/components/forms/custom-input";
import useResetPassword from "@/features/authentication/presentation/state/hooks/use-reset-password";


function ResetPasswordForm() {
    const {resetPasswordForm, resetPasswordHandler, isResettingPassword} = useResetPassword()
    return (
        <form className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Reset your password 🔑</h1>
      </div>
      <div className="grid gap-6">
          <CustomInput id='password' formController={resetPasswordForm} label="Password" placeholder="Enter your password" type="password"/>
          <CustomInput id='confirmPassword' formController={resetPasswordForm} label="Confirm Password" placeholder="Renter your password" type="password"/>
        <Button type="submit" className="w-full" disabled={isResettingPassword} onClick={() => resetPasswordForm.handleSubmit((data) => resetPasswordHandler(data))()}>
            {isResettingPassword ? 'Resetting...' : 'Reset password'}
        </Button>
      </div>
    </form>
    )
}

export default ResetPasswordForm
