import { RegisterForm } from "@/features/auth/RegisterForm";
import HeaderForm from "@/components/common/HeaderForm";

export function PageRegister() {
  return (
    <>
      <HeaderForm
        title="Create an account"
        description="Enter your details below to create your account"
      />
      <RegisterForm />
    </>
  );
}
