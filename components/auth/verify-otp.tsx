"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { LOGIN_URL } from "@/config/routes";
import Link from "next/link";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { cn } from "@/lib/utils";


export function VerifyOTP() {
  const [value, setValue] = React.useState("");
  const [expiresAt, setExpiresAt] = React.useState<Date | null>(null);
  const [remainingTime, setRemainingTime] = React.useState<number>(0);
  const [isPending, setIsPending] = React.useState(false);

  React.useEffect(() => {
    if (expiresAt) {
      const intervalId = setInterval(() => {
        const now = new Date();
        const timeLeft = expiresAt.getTime() - now.getTime();
        if (timeLeft <= 0) {
          setRemainingTime(0);
          clearInterval(intervalId);
        } else {
          setRemainingTime(Math.ceil(timeLeft / 1000));
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [expiresAt]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  React.useEffect(() => {
    const expirationDate = new Date(Date.now() + 30 * 1000); // 30 seconds from now
    setExpiresAt(expirationDate);
  }, []);

  return (
    <div className="  p-4">
      <h1 className="text-[36px] font-semibold">Reset Password</h1>
      <p className="text-[#676E76] text-[14px] pb-4">Enter the OTP that was sent to your email address</p>
      <div className="flex flex-col items-center">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
          className="flex space-x-2 mb-4 gap-2" // Added spacing between OTP slots
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={4} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div>

        </div>
        <div className={cn("text-center text-sm mb-4 md:mt-12", {
          "text-red-500": remainingTime > 0, // Time is still remaining
          "text-black": remainingTime <= 0, // Time has expired
        })}>
          Send code again  {remainingTime > 0 && ` ${formatTime(remainingTime)}`}
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full text-[14px] font-semibold"
          loading={isPending}
          loadingText="Verifying..."
        >
          Send me OTP <ArrowRight className="ml-3" />
        </Button>
      </div>

      <p className="text-[#676E76] text-[14px] mt-6">
        Remember password?{" "}
        <Link href={LOGIN_URL} className="font-semibold text-black">
          Login instead
        </Link>
      </p>
    </div>
  );
}
