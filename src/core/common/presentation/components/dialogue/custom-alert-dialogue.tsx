import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/core/common/presentation/components/ui/alert-dialog';

export function CustomAlertDialogue({
  title,
  description,
  visibility,
  setVisibility,
  action,
  cancelText = 'Cancel',
  actionText = 'Continue',
}: {
  title: string;
  description: string;
  visibility: boolean;
  setVisibility: (visibility: boolean) => void;
  action: () => void;
  cancelText?: string;
  actionText?: string;
  actionIsLoading?: boolean;
}) {
  return (
    <AlertDialog open={visibility} onOpenChange={setVisibility}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setVisibility(false)}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={action}>{actionText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
