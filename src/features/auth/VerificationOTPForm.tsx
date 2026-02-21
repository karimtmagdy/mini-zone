import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { RefreshCwIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
export default function VerificationOTPForm({
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form {...props} className="w-full max-w-2xs self-center">
      <FieldGroup className="flex items-center">
        <Field className="w-fit">
          <FieldLabel htmlFor="digits-only" className="sr-only">
            Digits Only
          </FieldLabel>
          <InputOTP id="digits-only" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
            <InputOTPGroup className="flex w-full justify-center">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSeparator className="mx-2" />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </Field>
        <Field>
          <div className="flex items-center justify-between gap-2">
            <FieldDescription>
              <Link to="#">I no longer have access to this email.</Link>
            </FieldDescription>

            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="icon-xs" type="button">
                  <RefreshCwIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Resend Code</TooltipContent>
            </Tooltip>
          </div>
          <Button type="submit">Verify</Button>
          <FieldDescription>
            <span>Having trouble signing in?</span>{" "}
            <Link
              to="#"
              className="hover:text-primary underline underline-offset-4 transition-colors"
            >
              Contact support
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
