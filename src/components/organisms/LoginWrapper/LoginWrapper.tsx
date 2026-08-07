"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Logo from "@/components/atoms/Logo/Logo";
import UserIcon from "@/components/atoms/icons/UserIcon";
import LoginForm from "@/components/molecules/forms/LoginForm/LoginForm";
import { routes } from "@/lib/helpers/routes";
import { useStore } from "@/store/authStore";

const LoginWrapper = () => {
  const router = useRouter();
  const currentUser = useStore((state) => state.currentUser);
  const isAuthInitialized = useStore((state) => state.isAuthInitialized);
  const openModal = useStore((state) => state.openModal);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);

  useEffect(() => {
    setIsModalFlow(false);
  }, [setIsModalFlow]);

  useEffect(() => {
    if (isAuthInitialized && currentUser) router.replace(routes.dashboard);
  }, [currentUser, isAuthInitialized, router]);

  const openSignUp = () => {
    setIsModalFlow(true);
    openModal("register");
  };

  return (
    <div className="min-h-screen bg-white text-[#474C48]">
      <header className="flex h-20 items-center justify-between border-b border-[#ECECEC] px-5 sm:px-10 lg:px-20">
        <Logo href={routes.home} />
        <span className="grid size-10 place-items-center rounded-full bg-[#EAECF0] text-lg text-[#98A2B3]">
          <UserIcon />
        </span>
      </header>

      <main className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-[minmax(360px,625px)_minmax(0,1fr)]">
        <div className="relative hidden min-h-[calc(100vh-5rem)] overflow-hidden lg:block">
          <Image
            src="/assets/images/LoginState.svg"
            alt="Emilist professional welcoming users"
            fill
            priority
            className="object-cover object-top"
          />
        </div>

        <section className="flex justify-center px-5 py-8 sm:px-10 lg:px-14 lg:py-12">
          <div className="w-full max-w-155">
            <div className="mb-9 flex gap-2">
              <button
                type="button"
                onClick={openSignUp}
                className="rounded-full bg-[#FAFAFA] px-4 py-2 text-xs text-[#737774] transition-colors hover:bg-[#F0FDF5]"
              >
                Sign up
              </button>
              <span className="rounded-full bg-[#F0FDF5] px-4 py-2 text-xs font-medium text-[#176439]">
                Log in
              </span>
            </div>

            <div className="mb-8 border-b border-[#ECECEC] pb-5">
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-md bg-[#F8F8F8] text-[#303632]">
                  <UserIcon />
                </span>
                <h1 className="font-exo text-2xl font-bold text-[#303632]">
                  Log In
                </h1>
                <span className="ml-auto size-2 rounded-full bg-[#25C269]" />
              </div>
              <p className="mt-3 text-sm text-[#8A8D8B]">
                Access your dashboard after filling your credentials
              </p>
            </div>

            <LoginForm variant="page" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoginWrapper;
