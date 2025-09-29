import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import {toast} from "sonner";

import {useAppStore} from "@/core/common/presentation/state/store";
import {extractErrorHooks} from "@/core/helpers/extract-error-hooks";
import {verifyAccessToEmailLabelEffect} from "@/features/email/presentation/state/store/effects";
import {verifyEmailLabelSchema, VerifyEmailLabelSchemaType} from "@/features/email/presentation/validation/email-sync";

const useVerifyEmailLabel = () => {
    const {setStep} = useAppStore();
    const emailLabelForm = useForm<VerifyEmailLabelSchemaType>({
        resolver: zodResolver(verifyEmailLabelSchema),
        defaultValues: {
            labelName: ''
        }
    })

    const {isLoading: verifyingAccess, mutateAsync: verifyEmailLabelAccessHandler} = useMutation(
        ['verify-email-label'],
        async (data: VerifyEmailLabelSchemaType) => {
            return verifyAccessToEmailLabelEffect(data.labelName);
        },
        {
            onSuccess: message => {
                emailLabelForm.reset();
                toast.success(message);
                setStep(3);
            },
            onError: error => {
                const errorMessage = extractErrorHooks(error, 'useVerifyEmailLabel');
                toast.error(errorMessage);
            }
        }
    )

    return {
        emailLabelForm,
        verifyingAccess,
        verifyEmailLabelAccessHandler,
    }
};

export default useVerifyEmailLabel;