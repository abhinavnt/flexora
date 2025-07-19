import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resendOtp, verifyOtp } from "@/services/authService";
import { MAX_TIMER_PERSISTENCE_MINUTES, OTP_LENGTH, RESEND_TIME_SECONDS } from "@/utils/auth/otpUtils";

export function useOtp(email: string) {
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(RESEND_TIME_SECONDS);
  const [isResending, setIsResending] = useState(false);
  const [hasError, setHasError] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>(new Array(OTP_LENGTH).fill(null));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startTimer = useCallback(() => {
    setIsResending(true);
    setHasError(false);
    const storedEndTime = localStorage.getItem("otpTimerEndTime");
    let initialTimeLeft = RESEND_TIME_SECONDS;

    if (storedEndTime) {
      const endTime = parseInt(storedEndTime, 10);
      const now = Date.now();
      const remaining = Math.round((endTime - now) / 1000);

      if (remaining > 0 && remaining <= RESEND_TIME_SECONDS + MAX_TIMER_PERSISTENCE_MINUTES * 60) {
        initialTimeLeft = remaining;
      } else {
        localStorage.removeItem("otpTimerEndTime");
      }
    }

    setTimeLeft(initialTimeLeft);

    if (!storedEndTime || initialTimeLeft === RESEND_TIME_SECONDS) {
      localStorage.setItem("otpTimerEndTime", (Date.now() + RESEND_TIME_SECONDS * 1000).toString());
    }

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          setIsResending(false);
          localStorage.removeItem("otpTimerEndTime");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    const cleanup = startTimer();
    return cleanup;
  }, [startTimer]);

  const handleChange = ( index: number, value: string) => {
    setHasError(false);

    if (value.length > 1) {
      if (value.length === OTP_LENGTH && /^\d+$/.test(value)) {
        setOtp(value.split(""));
        inputRefs.current[OTP_LENGTH - 1]?.focus();
      }
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (pasteData.length === OTP_LENGTH && /^\d+$/.test(pasteData)) {
      setOtp(pasteData.split(""));
      inputRefs.current[OTP_LENGTH - 1]?.focus();
      setHasError(false);
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");

    try {
      const response = await verifyOtp(email, enteredOtp, dispatch);

      if (response.status === 200) {
        setHasError(false);
        setOtp(new Array(OTP_LENGTH).fill(""));
        localStorage.removeItem("otpTimerEndTime");
        if (response.data.user.role === "user") {
          navigate("/");
        }else{
          navigate("/employer")
        }
      } else {
        setHasError(true);
      }
    } catch {
      setHasError(true);
    }
  };

  const handleResendOtp = async() => {
    setOtp(new Array(OTP_LENGTH).fill(""));
    await resendOtp(email)
    startTimer();
  };

  return {
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
  };
}
