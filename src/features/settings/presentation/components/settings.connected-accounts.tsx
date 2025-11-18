import {ChevronDown, ChevronUp, Mail} from "lucide-react";
import React, {ReactNode} from "react";

import CustomInput from "@/core/common/presentation/components/forms/custom-input";
import {useAppStore} from "@/core/common/presentation/state/store";
import useGetSyncStatus from "@/features/email/presentation/state/hooks/use-get-sync-status";
import useVerifyEmailLabel from "@/features/email/presentation/state/hooks/use-verify-email-label";
import SettingOptionHeader from "@/features/settings/presentation/components/setting.option-header";
import useGetUser from "@/features/user/presentation/state/hook/use-get-user";

export const SettingsConnectedAccountWrapper = ({
                                                    children,
                                                }: {
    children: ReactNode;
}) => {
    return (
        <div className="flex flex-col gap-6 w-full lg:w-[35vw]">{children}</div>
    );
};


export const SettingsConnectedAccountItem = () => {
    const {user} = useAppStore();
    const {isFetchingUser} = useGetUser();
    const {emailLabelForm, verifyingAccess, verifyEmailLabelAccessHandler} = useVerifyEmailLabel();
    useGetSyncStatus();

    const [showDetails, setShowDetails] = React.useState(false);


    return (
        <div className="flex flex-col gap-6 w-full border border-muted-foreground rounded-md px-4 py-3">
            <div className="flex flex-row justify-between items-center w-full ">
                <div className="flex flex-row items-center gap-4">
                    <div className="p-2.5 bg-muted rounded-md">
                        <Mail/>
                    </div>
                    <div className="font-medium">GMail</div>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <div className="text-sm text-green-500 border border-green-500 px-2 py-1 rounded-md">
                        {isFetchingUser
                            ? "Loading..."
                            : user?.emailLinked
                                ? "Connected"
                                : "Not Connected"}
                    </div>
                    <button
                        className="text-sm text-primary flex flex-row items-center gap-1"
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        {showDetails ? "Hide Details" : "Show Details"}
                        {showDetails ? <ChevronUp/> : <ChevronDown/>}
                    </button>
                </div>
            </div>
            {showDetails && (
                <div className="flex flex-row items-center gap-4">
                    <div className='w-[90%] flex flex-col gap-2'>
                        <CustomInput id="labelName" formController={emailLabelForm} label="Email label"/>
                        <p className="text-muted-foreground text-sm">This is the email label that is being sync. Update
                            value if the label has changed </p>
                    </div>
                    <button
                        className="px-2.5 py-1.5 bg-primary text-white rounded-md flex-1"
                        onClick={() => verifyEmailLabelAccessHandler({labelName: emailLabelForm.getValues('labelName')})}
                        disabled={verifyingAccess}
                    >
                        {verifyingAccess ? "Verifying..." : "Verify"}
                    </button>
                </div>
            )}
        </div>
    )
}


export const SettingsConnectedAccount = () => {
    return (
        <SettingsConnectedAccountWrapper>
            <SettingOptionHeader
                title="Connected Accounts"
                description="Manage your connected accounts and integrations."
            />
            <SettingsConnectedAccountItem/>
        </SettingsConnectedAccountWrapper>
    )
}