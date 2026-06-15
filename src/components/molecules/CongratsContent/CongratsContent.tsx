"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import confetti from "canvas-confetti";

import Container from "@/components/atoms/Container/Container";
import UserFlag from "@/components/atoms/icons/UserFlag";
import { routes } from "@/lib/helpers/routes";

const CongratsContent = ({
  title,
  desc,
  href = routes.dashboard,
}: {
  title: string;
  desc: string;
  href?: string;
}) => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      angle: 60,
      origin: { x: 0, y: 0.5 },
    });

    confetti({
      particleCount: 150,
      spread: 70,
      angle: 120,
      origin: { x: 1, y: 0.5 },
    });

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 180,
        origin: { y: 0.6 },
      });
    }, 300);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push(href);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [href, router]);

  return (
    <div className="flex-1 h-full flex justify-center items-center">
      <Container>
        <div className="pt-20 pb-5 flex flex-col justify-center items-center gap-10">
          <div className="space-y-8">
            <div className="space-y-6">
              {" "}
              <h2 className="sm:text-4xl text-2xl font-bold font-exo leading-10 text-[#25C269] text-center">
                {title}
              </h2>
              <p className="font-exo max-sm:text-sm text-center">{desc}</p>
            </div>
            <div className="flex justify-center">
              <Link
                href={href}
                className="text-center sm:text-sm text-xs text-[#333E49] font-exo flex items-center gap-1 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
                Back to <span className="text-[#18A154]">Dashboard</span>
                <span className="text-[#18A154] font-semibold">
                  {" "}
                  {countdown}
                </span>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <UserFlag />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CongratsContent;
