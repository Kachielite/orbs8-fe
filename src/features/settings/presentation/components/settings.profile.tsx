import React from 'react'

import CustomInput from "@/core/common/presentation/components/forms/custom-input";
import useUpdateUser from "@/features/user/presentation/state/hook/use-update-user";

function SettingsProfile() {
    const {updateUserForm, isUpdatingUser, updateUserHandler} = useUpdateUser();
    return (
        <div>
            <CustomInput id="name" formController={updateUserForm} label="Name" placeholder="Enter your name"/>

        </div>
    )
}

export default SettingsProfile
