import {useForm} from "react-hook-form";
import {
    requestPasswordResetSchema,
    RequestPasswordResetSchemaType
} from "@/features/authentication/presentation/validation/auth.validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "react-query";
import {requestPasswordResetEffect} from "@/features/authentication/presentation/state/store/effect";
import {toast} from "sonner";
import {extractErrorHooks} from "@/core/helpers/extract-error-hooks";

const useRequestPasswordReset = () => {
    const resetPasswordForm = useForm<RequestPasswordResetSchemaType>({
        resolver: zodResolver(requestPasswordResetSchema),
        mode: 'onBlur',
        defaultValues: {
            email: '',
        },
    })

    const {mutateAsync: requestPasswordResetHandler, isLoading: isRequestingPasswordRest} = useMutation(
        ['requestPasswordReset'],
        async (data: RequestPasswordResetSchemaType) => {
          return requestPasswordResetEffect({
              email: data.email,
          })
        },
        {
            onSuccess: () => {
                toast.success('An email has been sent to reset your password, please check your inbox');
                resetPasswordForm.reset();
            },
            onError: error => {
                const errorMessage = extractErrorHooks(error, 'useRequestPasswordReset');
                toast.error(errorMessage);
            },
        }
    )

    return {
        resetPasswordForm,
        requestPasswordResetHandler,
        isRequestingPasswordRest,
    }
}

export default useRequestPasswordReset