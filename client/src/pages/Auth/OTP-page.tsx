"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const OTP_LENGTH = 6
const RESEND_TIME_SECONDS = 60
const MAX_TIMER_PERSISTENCE_MINUTES = 5 // Max time to persist timer across "leaves"

interface OtpPageProps {
  email: string // Prop to receive the user's email
}

export default function OtpPage({ email }: OtpPageProps) {
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""))
  const [timeLeft, setTimeLeft] = useState(RESEND_TIME_SECONDS)
  const [isResending, setIsResending] = useState(false)
  const [hasError, setHasError] = useState(false)
  const inputRefs = useRef<Array<HTMLInputElement | null>>(new Array(OTP_LENGTH).fill(null))

  const startTimer = useCallback(() => {
    setIsResending(true)
    setHasError(false) // Clear error on new timer start

    const storedEndTime = localStorage.getItem("otpTimerEndTime")
    let initialTimeLeft = RESEND_TIME_SECONDS

    if (storedEndTime) {
      const endTime = Number.parseInt(storedEndTime, 10)
      const now = Date.now()
      const remaining = Math.round((endTime - now) / 1000)

      // Check if the stored timer is still valid (in the future and not too old)
      // If it's too old (e.g., more than MAX_TIMER_PERSISTENCE_MINUTES since it should have ended), reset.
      if (remaining > 0 && remaining <= RESEND_TIME_SECONDS + MAX_TIMER_PERSISTENCE_MINUTES * 60) {
        initialTimeLeft = remaining
      } else {
        // Stored timer is stale or in the past, reset it
        localStorage.removeItem("otpTimerEndTime")
      }
    }

    setTimeLeft(initialTimeLeft)

    // Set new end time if we are starting a fresh timer or the old one was stale
    if (!storedEndTime || initialTimeLeft === RESEND_TIME_SECONDS) {
      localStorage.setItem("otpTimerEndTime", (Date.now() + RESEND_TIME_SECONDS * 1000).toString())
    }

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval)
          setIsResending(false)
          localStorage.removeItem("otpTimerEndTime") // Clear when timer finishes
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [])

  useEffect(() => {
    const cleanup = startTimer()
    return cleanup
  }, [startTimer])

  const handleChange = (element: HTMLInputElement, index: number, value: string) => {
    setHasError(false) // Clear error on input change

    // Only allow single digit input
    if (value.length > 1) {
      // If pasting, try to fill all inputs
      if (value.length === OTP_LENGTH && /^\d+$/.test(value)) {
        const newOtp = value.split("")
        setOtp(newOtp)
        inputRefs.current[OTP_LENGTH - 1]?.focus() // Focus last input
      }
      return
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if current input is filled
    if (value !== "" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData("text").trim()
    if (pasteData.length === OTP_LENGTH && /^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split("")
      setOtp(newOtp)
      inputRefs.current[OTP_LENGTH - 1]?.focus() // Focus last input after pasting
      setHasError(false)
    }
  }

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("")
    // Simulate OTP verification
    if (enteredOtp === "123456") {
      alert("OTP Verified Successfully!")
      setHasError(false)
      setOtp(new Array(OTP_LENGTH).fill("")) // Clear OTP
      localStorage.removeItem("otpTimerEndTime") // Clear timer on success
    } else {
      setHasError(true)
      alert("Incorrect OTP. Please try again.")
    }
  }

  const handleResendOtp = () => {
    setOtp(new Array(OTP_LENGTH).fill("")) // Clear OTP on resend
    startTimer()
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

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
                // FIX: Changed the ref callback to explicitly not return a value
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target, index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className={cn(
                  "w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl font-bold",
                  "bg-gray-50 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-xl",
                  "focus:border-gray-900 dark:focus:border-gray-50 focus:ring-2 focus:ring-gray-900/50 dark:focus:ring-gray-50/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900",
                  "transition-all duration-200 ease-in-out",
                  hasError && "border-red-500 dark:border-red-400 ring-2 ring-red-500/50 dark:ring-red-400/50",
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
              className="w-full py-3 text-xl font-semibold rounded-xl
                         bg-gray-900 text-white
                         hover:bg-gray-800
                         dark:bg-gray-50 dark:text-black
                         dark:hover:bg-gray-200
                         shadow-md shadow-gray-900/20 dark:shadow-gray-50/20
                         transition-all duration-200 ease-in-out
                         disabled:opacity-60 disabled:shadow-none"
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
  )
}
