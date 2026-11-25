"use client";
import { Loader } from "lucide-react";
import Image from "next/image";
import Button from "@/components/atoms/Button/Button";

export default function GoogleAuthStatus({ error = false, onRetry, onCancel, message = "Loading your dashboard…" }: { message?: string; error?: boolean; onRetry?: () => void; onCancel?: () => void }) {
  return (
    <main className="grid min-h-dvh place-items-center bg-[#F5F8F6] px-5">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
        <Image src="/assets/images/logo.svg" alt="Emilist" width={148} height={34} className="h-auto w-37" />
        {error ? <>
          <h1 className="font-exo text-xl font-semibold text-[#474C48]">Unable to complete sign-in</h1>
          <p role="alert" className="text-sm leading-6 text-[#737774]">We couldn’t verify your session. Please try again or return to login.</p>
          <div className="flex gap-3"><Button type="button" variant="default" className="h-11 flex-1" onClick={onCancel}>Back to login</Button><Button type="button" variant="primary" className="h-11 flex-1" onClick={onRetry}>Try again</Button></div>
        </> : <div role="status" aria-live="polite" className="flex items-center justify-center gap-2.5"><Loader aria-hidden="true" className="size-4 animate-spin text-[#18A154] motion-reduce:animate-none" /><p className="text-sm text-[#737774]">{message}</p></div>}
      </div>
    </main>
  );
}
