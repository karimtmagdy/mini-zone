import { LoginForm } from "@/features/auth/LoginForm";
import HeaderForm from "@/components/common/HeaderForm";

export function PageLogin() {
  return (
    <>
      <HeaderForm
        title="Login to your account"
        description="Enter your email below to login to your account"
      />
      <LoginForm />
    </>
  );
}
