import HeaderForm from "@/components/common/HeaderForm";
import { ChangePasswordForm } from "@/features/auth/ChangePasswordForm";

export function PageChangePassword() {
  return (
    <>
      <HeaderForm
        title="Change Password"
        description="Update your password to keep your account secure"
      />
      <ChangePasswordForm />
    </>
  );
}
