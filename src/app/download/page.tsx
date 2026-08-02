"use client";

import { useEffect } from "react";

import DownloadBtn from "@/components/atoms/DownloadBtn/DownloadBtn";
import {
  APP_STORE_URL,
  PLAY_STORE_URL,
} from "@/lib/constants/appDownload";

const DownloadPage = () => {
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isAppleMobile =
      /iPhone|iPad|iPod/i.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isAppleMobile) {
      window.location.replace(APP_STORE_URL);
      return;
    }

    if (/Android/i.test(userAgent)) {
      window.location.replace(PLAY_STORE_URL);
    }
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-[#030A05] px-6">
      <section className="max-w-lg text-center">
        <h1 className="font-exo text-3xl font-semibold text-white">
          Download Emilist
        </h1>
        <p className="mt-3 text-[#FBFFF8]">
          Choose your device&apos;s app store to download the Emilist mobile
          app.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <DownloadBtn
            href={APP_STORE_URL}
            alt="Download Emilist from the App Store"
            imgUrl="/assets/images/appStore.svg"
            width={28}
            height={28}
          />
          <DownloadBtn
            href={PLAY_STORE_URL}
            alt="Download Emilist from Google Play"
            imgUrl="/assets/images/google-play.svg"
            width={28}
            height={28}
          />
        </div>
      </section>
    </main>
  );
};

export default DownloadPage;

