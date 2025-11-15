import React, {ReactNode} from 'react';
import {UseFormReturn} from 'react-hook-form';

import CustomInput from '@/core/common/presentation/components/forms/custom-input';
import {Button} from '@/core/common/presentation/components/ui/button';
import SettingOptionHeader from '@/features/settings/presentation/components/setting.option-header';
import useUpdateUser from '@/features/user/presentation/state/hook/use-update-user';
import {UpdateUserSchemaType} from '@/features/user/presentation/validation/user.validation';

export const SettingsProfileWrapper = ({
                                           children,
                                       }: {
    children: ReactNode;
}) => {
    return <div className="flex flex-col gap-6 w-full">{children}</div>;
};

export const SettingsProfileForm = ({
                                        children,
                                        formController,
                                        onUpdate,
                                    }: {
    children: ReactNode;
    formController: UseFormReturn<UpdateUserSchemaType>;
    onUpdate: (payload: UpdateUserSchemaType) => void;
}) => {
    return (
        <form
            onSubmit={formController.handleSubmit(data => onUpdate(data))}
            className="flex flex-col gap-6 w-full"
        >
            {children}
        </form>
    );
};

export const SettingsProfileInput = ({
                                         id,
                                         formController,
                                         label,
                                         placeholder,
                                         hint,
                                     }: {
    id: 'name' | 'currencyCode';
    formController: UseFormReturn<UpdateUserSchemaType>;
    label: string;
    placeholder: string;
    hint: string;
}) => {
    return (
        <div className="flex flex-col gap-3 w-full">
            <CustomInput
                id={id}
                formController={formController}
                label={label}
                placeholder={placeholder}
            />
            <p>{hint}</p>
        </div>
    );
};

export const SettingsProfileAction = ({
                                          isUpdating,
                                      }: {
    isUpdating: boolean;
}) => {
    return (
        <Button disabled={isUpdating} type="submit">
            {isUpdating ? 'Updating' : 'Update Profile'}
        </Button>
    );
};

export const SettingsProfile = () => {
    const {isUpdatingUser, updateUserHandler, updateUserForm} = useUpdateUser();
    return (
        <SettingsProfileWrapper>
            <SettingOptionHeader
                title="Profile"
                description="Update your profile details."
            />
            <SettingsProfileForm
                formController={updateUserForm}
                onUpdate={updateUserHandler}
            >
                <SettingsProfileInput
                    formController={updateUserForm}
                    label="Name"
                    placeholder="Enter your name"
                    id="name"
                    hint="This is the name that will be displayed on your profile and in emails."
                />
                <SettingsProfileInput
                    formController={updateUserForm}
                    label="Preferred Currency"
                    placeholder="Select your preferred currency"
                    id="currencyCode"
                    hint="This will be currency used on the dashboard and reports"
                />
                <SettingsProfileAction isUpdating={isUpdatingUser}/>
            </SettingsProfileForm>
        </SettingsProfileWrapper>
    );
};
