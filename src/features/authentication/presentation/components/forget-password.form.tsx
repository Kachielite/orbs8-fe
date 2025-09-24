import React from 'react'
import {Button} from "@/core/common/presentation/components/ui/button";
import CustomInput from "@/core/common/presentation/components/forms/custom-input";
import useRequestPasswordReset from "@/features/authentication/presentation/state/hooks/use-request-password-reset";


function ForgetPasswordForm() {
    const {resetPasswordForm, requestPasswordResetHandler, isRequestingPasswordRest} = useRequestPasswordReset()
    return (
        <form className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Recover your password 🔑</h1>
        <p className="text-muted-foreground text-sm text-balance">
            We'll send you an email to reset your password.
        </p>
      </div>
      <div className="grid gap-6">
        <CustomInput id='email' formController={resetPasswordForm} label="Email" placeholder="Enter your email"/>
        <Button type="submit" className="w-full" disabled={isRequestingPasswordRest} onClick={() => resetPasswordForm.handleSubmit((data) => requestPasswordResetHandler(data),)()}>
          Send Reset Link
        </Button>
      </div>
    </form>
    )
}

export default ForgetPasswordForm
