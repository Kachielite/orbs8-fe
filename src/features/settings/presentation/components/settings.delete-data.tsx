import React from 'react'

import {CustomAlertDialogue} from "@/core/common/presentation/components/dialogue/custom-alert-dialogue";
import useRevokeAccessDeleteData from "@/features/email/presentation/state/hooks/use-revoke-access-delete-data";

function SettingsDeleteData({visibility, setVisibility}: {
    visibility: boolean,
    setVisibility: (visibility: boolean) => void
}) {
    const {isRevokingAccessAndDeletingData, revokeAccessAndDeleteDataHandler} = useRevokeAccessDeleteData();
    return (
        <CustomAlertDialogue
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently revoke email access and delete all your data from our servers."
            visibility={visibility}
            setVisibility={() => setVisibility(false)}
            action={revokeAccessAndDeleteDataHandler}
            cancelText="Cancel"
            actionText="Proceed"
            actionIsLoading={isRevokingAccessAndDeletingData}
        />
    )
}

export default SettingsDeleteData
