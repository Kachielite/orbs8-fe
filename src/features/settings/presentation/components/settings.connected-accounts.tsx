import {ChevronDown, ChevronUp, Mail} from "lucide-react";
import React, {ReactNode} from "react";
import {useNavigate} from "react-router-dom";

import CustomInput from "@/core/common/presentation/components/forms/custom-input";
import {useAppStore} from "@/core/common/presentation/state/store";
import {cn} from "@/core/lib/utils";
import useGetSyncStatus from "@/features/email/presentation/state/hooks/use-get-sync-status";
import useVerifyEmailLabel from "@/features/email/presentation/state/hooks/use-verify-email-label";
import SettingOptionHeader from "@/features/settings/presentation/components/setting.option-header";
import SettingsDeleteData from "@/features/settings/presentation/components/settings.delete-data";
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
    const navigate = useNavigate();
    const {user} = useAppStore();
    const {isFetchingUser} = useGetUser();
    const {emailLabelForm, verifyingAccess, verifyEmailLabelAccessHandler} = useVerifyEmailLabel();
    useGetSyncStatus();

    const [showDetails, setShowDetails] = React.useState(false);
    const [showDeleteDataDialogue, setShowDeleteDataDialogue] = React.useState(false);


    return (
        <div className="flex flex-col gap-6 w-full border border-muted-foreground rounded-md px-4 py-3">
            <div className="flex flex-row justify-between items-center w-full ">
                <div className="flex flex-row items-center gap-4">
                    <div className="p-2.5 bg-muted rounded-md">
                        <Mail/>
                    </div>
                    <div className="font-medium">Gmail</div>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <div className={cn("text-sm px-2 py-1 rounded-md",
                        user?.emailLinked ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    )}>
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
                user?.emailLinked ?
                <div className="flex flex-col w-full gap-7">
                    <div className="flex flex-row items-start gap-4">
                    <div className='w-[90%] flex flex-col gap-2'>
                        <CustomInput id="labelName" formController={emailLabelForm}/>
                        <p className="text-muted-foreground text-sm">This is the email label that is being sync. Update
                            value if the label has changed </p>
                    </div>
                    <button
                        className="px-2.5 py-1.5 bg-primary text-white rounded-md flex-1 text-sm self-start mt-3.5"
                        onClick={() => verifyEmailLabelAccessHandler({labelName: emailLabelForm.getValues('labelName')})}
                        disabled={verifyingAccess}
                    >
                        {verifyingAccess ? "Verifying..." : "Verify"}
                    </button>
                    </div>
                    <button onClick={() => setShowDeleteDataDialogue(true)}
                            className="px-2.5 py-1.5 bg-red-600 text-white text-sm rounded-md self-end">
                        Disconnect Account and Delete Data
                    </button>
                </div> :
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-sm text-foreground">Connect your Gmail account to start syncing your emails.
                            Once connected, you can manage your email
                            label and data from here.</p>
                        <button
                            onClick={() => navigate("/link-email")}
                            className="px-2.5 py-1.5 bg-primary text-white rounded-md self-end text-sm"
                        >Connect Gmail Account
                        </button>
                </div>
            )}
            <SettingsDeleteData setVisibility={setShowDeleteDataDialogue} visibility={showDeleteDataDialogue}/>
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