import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { useOtp } from "@/hooks/auth/useOtp";
import { formatTime, OTP_LENGTH } from "@/utils/auth/otpUtils";

export default function OtpPage() {
  const location = useLocation();
  const email = location.state?.email || "your email";
  const {
    otp,
    inputRefs,
    timeLeft,
    isResending,
    hasError,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleVerifyOtp,
    handleResendOtp,
  } = useOtp(email);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <Card className="w-full max-w-md p-8 sm:p-10 bg-white dark:bg-gray-900 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-800">
        <CardHeader className="text-center space-y-3 mb-6">
          <CardTitle className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">OTP Verification</CardTitle>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Enter the 6-digit code sent to{" "}
            <span className="font-semibold text-gray-800 dark:text-gray-200">{email}</span>.
          </p>
        </CardHeader>
        <CardContent className="space-y-6 px-4 sm:px-6">
          <div className="flex justify-center gap-3 sm:gap-4">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el as HTMLInputElement | null;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className={cn(
                  "w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl font-bold",
                  "bg-gray-50 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-xl",
                  "focus:border-gray-900 dark:focus:border-gray-50 focus:ring-2 focus:ring-gray-900/50 dark:focus:ring-gray-50/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900",
                  "transition-all duration-200 ease-in-out",
                  hasError && "border-red-500 dark:border-red-400 ring-2 ring-red-500/50 dark:ring-red-400/50"
                )}
                inputMode="numeric"
                pattern="[0-9]"
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>
          {hasError && (
            <p className="text-center text-sm text-red-500 dark:text-red-400">
              Incorrect OTP. Please check and try again.
            </p>
          )}
          <div className="flex flex-col items-center space-y-4">
            <Button
              onClick={handleVerifyOtp}
              className="w-full py-3 text-xl font-semibold rounded-xl bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-black dark:hover:bg-gray-200 shadow-md shadow-gray-900/20 dark:shadow-gray-50/20 transition-all duration-200 ease-in-out disabled:opacity-60 disabled:shadow-none"
              disabled={otp.join("").length !== OTP_LENGTH}
            >
              Verify OTP
            </Button>
            <div className="text-base text-gray-500 dark:text-gray-400 mt-4">
              {timeLeft > 0 ? (
                <span className="font-medium">Resend code in {formatTime(timeLeft)}</span>
              ) : (
                <Button
                  variant="link"
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="p-0 h-auto text-gray-700 dark:text-gray-300 font-medium hover:underline"
                >
                  Resend Code
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
