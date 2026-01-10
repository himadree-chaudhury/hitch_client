"use client";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"; // Ensure you have this or standard inputs
import { requestVerificationOtp, verifyOtp } from "@/services/dashboard/verify";
import {
  CheckCircle2,
  Loader2,
  Mail,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function VerifyAccount({ isVerified }: { isVerified: boolean }) {
  const [step, setStep] = useState<"IDLE" | "OTP_SENT">("IDLE");
  const [loading, setLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  // 1. Handle Requesting OTP
  const handleRequestOtp = async () => {
    setLoading(true);
    const result = await requestVerificationOtp();
    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      setStep("OTP_SENT");
    } else {
      toast.error(result.message);
    }
  };

  // 2. Handle Verifying OTP
  const handleVerify = async () => {
    if (otpValue.length !== 6) {
      toast.error("Please enter a complete 6-digit code.");
      return;
    }

    setLoading(true);
    const result = await verifyOtp(otpValue);
    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      // Optional: Redirect or just let revalidatePath update the prop
    } else {
      toast.error(result.message);
    }
  };

  // --- UI STATE: ALREADY VERIFIED ---
  if (isVerified) {
    return (
      <Card className="mx-auto max-w-md border-green-200 bg-green-50 shadow-sm">
        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <ShieldCheck className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-800">
              Account Verified
            </h2>
            <p className="text-green-700">
              Your identity has been confirmed. You have full access to all
              features.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // --- UI STATE: NOT VERIFIED ---
  return (
    <Card className="mx-auto max-w-md shadow-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
          <ShieldAlert className="h-6 w-6 text-yellow-600" />
        </div>
        <CardTitle>Verify Your Account</CardTitle>
        <CardDescription>
          {step === "IDLE"
            ? "Secure your account by verifying your email address."
            : "Enter the 6-digit code sent to your email."}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-6">
        {step === "IDLE" && (
          <Button
            size="lg"
            className="w-full"
            onClick={handleRequestOtp}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" /> Send Verification Code
              </>
            )}
          </Button>
        )}

        {step === "OTP_SENT" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 flex w-full flex-col items-center gap-6">
            {/* OTP Input Component */}
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={(value) => setOtpValue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <div className="flex w-full flex-col gap-2">
              <Button
                onClick={handleVerify}
                disabled={loading || otpValue.length < 6}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                )}
                Verify Code
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleRequestOtp}
                disabled={loading}
                className="text-muted-foreground text-xs"
              >
                Didn&apos;t receive code? Resend
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
