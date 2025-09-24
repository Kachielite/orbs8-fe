import React from 'react'
import {IMAGES} from "@/core/constants/images.constants";
import FormLayout from "@/features/authentication/presentation/components/form.layout";
import RegisterForm from "@/features/authentication/presentation/components/register.form";

function RegisterPage() {
    return (
        <FormLayout image={IMAGES.RESET_PASSWORD} form={<RegisterForm />} />
    )
}

export default RegisterPage
