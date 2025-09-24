import {redirect, useLocation, useNavigate} from 'react-router-dom';
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {
    ResetPasswordFormSchemaType,
    resetPasswordSchema
} from "@/features/authentication/presentation/validation/auth.validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "react-query";
import {resetPasswordEffect} from "@/features/authentication/presentation/state/store/effect";
import {extractErrorHooks} from "@/core/helpers/extract-error-hooks";

const useResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if(!token){
        toast.error('Invalid reset password link, please request a new one');
        return redirect('/forgot-password');
    }

    const resetPasswordForm = useForm<ResetPasswordFormSchemaType>({
        resolver: zodResolver(resetPasswordSchema),
        mode: 'onBlur',
        defaultValues: {
            password: '',
            confirmPassword: '',
            token
        }
    });

    const {mutateAsync: resetPasswordHandler, isLoading: isResettingPassword} = useMutation(
        ['resetPassword'],
        async (data: ResetPasswordFormSchemaType) => {
           return resetPasswordEffect({
               password: data.password,
               token: data.token,
           })
        },
        {
            onSuccess: ()=> {
                toast.success('Reset password successfully, please login');
                navigate('/login');
                resetPasswordForm.reset();
            },
            onError: error => {
                const errorMessage = extractErrorHooks(error, 'useResetPassword');
                toast.error(errorMessage);
            }
        }
    );

    return {
        resetPasswordForm,
        resetPasswordHandler,
        isResettingPassword,
    }

};

export default useResetPassword;