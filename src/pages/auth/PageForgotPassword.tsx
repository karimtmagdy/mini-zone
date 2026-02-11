import { ForgotPasswordForm } from "@/features/auth/ForgotPasswordForm";
import HeaderForm from "@/components/common/HeaderForm";

export function PageForgotPassword() {
  return (
    <>
      <HeaderForm
        title="Forgot Password"
        description="Enter your email address and we'll send you a link to reset your password"
      />
      <ForgotPasswordForm />
    </>
  );
}

// function ForgotPasswordSuccess() {
