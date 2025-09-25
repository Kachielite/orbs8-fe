import { Input } from '@/core/common/presentation/components/ui/input';
import { Label } from '@/core/common/presentation/components/ui/label';

import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface CustomInputProps<T extends FieldValues> {
  id: Path<T>; // ensures `id` is a key of the form
  formController: UseFormReturn<T>;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  label?: string;
  dataTestId?: string;
}

function CustomInput<T extends FieldValues>({
  id,
  formController,
  placeholder = 'Enter text',
  type = 'text',
  label,
  dataTestId,
}: Readonly<CustomInputProps<T>>) {
  const {
    register,
    formState: { errors },
  } = formController;

  const errorMessage = errors[id]?.message as string | undefined;

  return (
    <div className="grid gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        {...register(id)}
        placeholder={placeholder}
        required
        aria-invalid={!!errorMessage}
        aria-errormessage={errorMessage}
        data-testid={dataTestId}
        className="w-full"
      />
      {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default CustomInput;
