export const OTP_LENGTH = 6;
export const RESEND_TIME_SECONDS = 60;
export const MAX_TIMER_PERSISTENCE_MINUTES = 5;

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};
