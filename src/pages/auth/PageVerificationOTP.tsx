import HeaderForm from "@/components/common/HeaderForm";
import VerificationOTPForm from "@/features/auth/VerificationOTPForm";

export default function PageVerificationOTP() {
  return (
    <div className="flex flex-col gap-6">
      <HeaderForm
        title="Verify your account"
        description="Enter the verification code we sent to your email address"
      />
      <VerificationOTPForm />
    </div>
  );
}
