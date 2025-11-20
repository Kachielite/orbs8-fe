import React from 'react';

import CustomInput from '@/core/common/presentation/components/forms/custom-input';
import {Button} from '@/core/common/presentation/components/ui/button';
import SettingOptionHeader from '@/features/settings/presentation/components/setting.option-header';
import useUpdatePassword from '@/features/user/presentation/state/hook/use-update-password';

function SettingsSecurity() {
    const {isUpdatingPassword, updatePasswordHandler, updatePasswordForm} =
        useUpdatePassword();
    return (
        <div className="flex flex-col gap-6 w-full lg:w-[30vw]">
            <SettingOptionHeader
                title="Security"
                description="Update your password and secure your account"
            />
            <form
                onSubmit={updatePasswordForm.handleSubmit(data =>
                    updatePasswordHandler(data)
                )}
                className="flex flex-col gap-10 w-full"
            >
                <div className="flex flex-col gap-3 w-full">
                    <CustomInput
                        id="currentPassword"
                        formController={updatePasswordForm}
                        label="Current Password"
                        placeholder="Enter your current password"
                        type="password"
                    />
                    <p> This is the current password you use to login</p>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <CustomInput
                        id="newPassword"
                        formController={updatePasswordForm}
                        label="New Password"
                        placeholder="Enter your new password"
                        type="password"
                    />
                    <p> This is the new password you want to use </p>
                </div>
                <Button
                    disabled={isUpdatingPassword}
                    type="submit"
                    className="text-white"
                >
                    {isUpdatingPassword ? 'Updating' : 'Update Password'}
                </Button>
            </form>
        </div>
    );
}

export default SettingsSecurity;
