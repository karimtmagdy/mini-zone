import { FieldDescription } from "@/components/ui/field";
import { Link, useLocation } from "react-router-dom";

export default function HaveAccount() {
  const location = useLocation();
  const isLogin = location.pathname === "/auth/login";
  const isRegister = location.pathname === "/auth/register";
  const isForgotPassword = location.pathname === "/auth/forgot-password";
  if (isLogin) {
    return (
      <FieldDescription className="text-center">
        Don&apos;t have an account?{" "}
        <Link to="/auth/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </FieldDescription>
    );
  }
  if (isRegister) {
    return (
      <FieldDescription className="text-center">
        Already have an account?{" "}
        <Link to="/auth/login" className="underline underline-offset-4">
          Login
        </Link>
      </FieldDescription>
    );
  }
  if (isForgotPassword) {
    return (
      <FieldDescription className="text-center">
        Remember your password?{" "}
        <Link to="/auth/login" className="underline underline-offset-4">
          Login
        </Link>
      </FieldDescription>
    );
  }
}
