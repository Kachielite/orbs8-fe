import React from 'react'
import {IMAGES} from "@/core/constants/images.constants";
import ForgetPasswordForm from "@/features/authentication/presentation/components/forget-password.form";
import FormLayout from "@/features/authentication/presentation/components/form.layout";

function ForgetPasswordPage() {
    return (
        <FormLayout image={IMAGES.FORGOT_PASSWORD} form={<ForgetPasswordForm />} />
    )
}

export default ForgetPasswordPage
