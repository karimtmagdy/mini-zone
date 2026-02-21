import { FieldDescription } from "@/components/ui/field";
import { Link, useLocation } from "react-router-dom";
import { PATH_AUTH } from "@/lib/links";
export default function HaveAccount() {
  const location = useLocation();
  const isLogin = location.pathname === PATH_AUTH.SIGNIN;
  const isRegister = location.pathname === PATH_AUTH.SIGNUP;
  const isForgotPassword = location.pathname === PATH_AUTH.FORGOT_PASSWORD;
  if (isLogin) {
    return (
      <FieldDescription className="text-center">
        Don&apos;t have an account?{" "}
        <Link to={PATH_AUTH.SIGNUP} className="underline underline-offset-4">
          Sign up
        </Link>
      </FieldDescription>
    );
  }
  if (isRegister) {
    return (
      <FieldDescription className="text-center">
        Already have an account?{" "}
        <Link to={PATH_AUTH.SIGNIN} className="underline underline-offset-4">
          Login
        </Link>
      </FieldDescription>
    );
  }
  if (isForgotPassword) {
    return (
      <FieldDescription className="text-center">
        Remember your password?{" "}
        <Link to={PATH_AUTH.SIGNIN} className="underline underline-offset-4">
          Login
        </Link>
      </FieldDescription>
    );
  }
}
