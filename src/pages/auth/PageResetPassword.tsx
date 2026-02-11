import HeaderForm from "@/components/common/HeaderForm";
import { ResetPasswordForm } from "@/features/auth/ResetPasswordForm";

export function PageResetPassword() {
  return (
    <>
      <HeaderForm
        title="Reset Password"
        description="Enter your new password below"
      />
      <ResetPasswordForm />
    </>
  );
}
