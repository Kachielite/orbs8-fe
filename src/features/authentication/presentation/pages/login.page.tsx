import React from 'react'
import FormLayout from "@/features/authentication/presentation/components/form.layout";
import {IMAGES} from "@/core/constants/images.constants";
import LoginForm from "@/features/authentication/presentation/components/login.form";

function LoginPage() {
    return (
        <FormLayout image={IMAGES.LOGIN} form={<LoginForm />} />
    )
}

export default LoginPage
