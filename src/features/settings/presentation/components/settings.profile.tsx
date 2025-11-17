import React, {ReactNode} from 'react';
import {UseFormReturn} from 'react-hook-form';

import CustomInput from '@/core/common/presentation/components/forms/custom-input';
import {Button} from '@/core/common/presentation/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/core/common/presentation/components/ui/select';
import {useAppStore} from '@/core/common/presentation/state/store';
import useGetCurrencies from '@/features/currency/presentation/state/hooks/use-get-currencies';
import SettingOptionHeader from '@/features/settings/presentation/components/setting.option-header';
import useUpdateUser from '@/features/user/presentation/state/hook/use-update-user';
import {UpdateUserSchemaType} from '@/features/user/presentation/validation/user.validation';

export const SettingsProfileWrapper = ({
                                           children,
                                       }: {
    children: ReactNode;
}) => {
    return (
        <div className="flex flex-col gap-6 w-full lg:w-[30vw]">{children}</div>
    );
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
            className="flex flex-col gap-10 w-full"
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
    const {currencies, user} = useAppStore();
    const {isUpdatingUser, updateUserHandler, updateUserForm} = useUpdateUser();
    useGetCurrencies();

    const currencyCode = updateUserForm.watch('currencyCode');
    const preferredCurrency = currencies?.find(
        item => item.code === currencyCode
    );

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
                <div className="flex flex-col gap-3 w-full">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white">
                        Preferred Currency
                    </label>
                    <Select
                        onValueChange={e => updateUserForm.setValue('currencyCode', e)}
                        value={updateUserForm.watch('currencyCode')}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Preferred Currency">
                                {preferredCurrency
                                    ? `${preferredCurrency.name} (${preferredCurrency.code})`
                                    : 'Select Preferred Currency'}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {currencies?.map(item => (
                                <SelectItem key={item.id} value={item.code}>
                                    {item.name} ({item.code})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p>
                        This currency will be used as your default for transactions and
                        reports.
                    </p>
                </div>
                <SettingsProfileAction isUpdating={isUpdatingUser}/>
            </SettingsProfileForm>
        </SettingsProfileWrapper>
    );
};
