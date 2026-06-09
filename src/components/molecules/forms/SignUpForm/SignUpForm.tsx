"use client";

import Button from "@/components/atoms/Button/Button";
import GoogleAuth from "@/components/atoms/GoogleAuth/GoogleAuth";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import AuthPrompt from "@/components/atoms/AuthPrompt/AuthPrompt";

import { useStore } from "@/store/authStore";
import { useShallow } from "zustand/react/shallow";
import { useSignUp } from "@/features/auth/hooks/useSignUp";
import { areAllFieldsFilled } from "@/lib/helpers/areAllFieldsFilled";
import PolicyModal from "../../modals/PolicyModal/PolicyModal";
import TermsOfUseModal from "../../modals/TermsOfUseModal/TermsOfUseModal";
import Checkbox from "@/components/atoms/Checkbox/Checkbox";

const SignUpForm = () => {
  const {
    userInfo,
    handleChange,
    handleSignup,
    inputType,
    toggleInputType,
    isRegistering,
    acceptTerms,
    setAcceptTerms,
    openPolicy,
    setOpenPolicy,
    openTerms,
    setOpenTerms,
  } = useSignUp();

  const isFormFilled = areAllFieldsFilled(userInfo);

  const { openModal, setIsModalFlow } = useStore(
    useShallow((state) => ({
      openModal: state.openModal,
      setIsModalFlow: state.setIsModalFlow,
    })),
  );

  const openLoginModal = () => {
    setIsModalFlow(true);
    openModal("login");
  };

  return (
    <>
      <form
        className="sm:space-y-10 space-y-8 font-exo"
        onSubmit={handleSignup}
      >
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" title="Enter Email" />
            <Input
              id="email"
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              placeholder="paulshotolu@gmail.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" title="Enter Password" />
            <Input
              id="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              placeholder="**************"
              type={inputType}
              showPassword={inputType}
              onTogglePassword={toggleInputType}
            />
          </div>
          <div className="flex gap-1 mt-1">
            <Checkbox value={acceptTerms} onChange={setAcceptTerms} />
            <p className="text-sm leading-6">
              By signing up with email or Google, you need to agree to our{" "}
              <button
                className="text-[#25C269] hover:text-green-700 cursor-pointer transition-colors duration-300"
                onClick={() => setOpenTerms(true)}
              >
                Terms of Use
              </button>{" "}
              and{" "}
              <button
                className="text-[#25C269] hover:text-green-700 cursor-pointer transition-colors duration-300"
                onClick={() => setOpenPolicy(true)}
              >
                Privacy Policy.
              </button>
            </p>
          </div>
        </div>
        <div className="space-y-8">
          <Button
            type="submit"
            className="w-full h-11"
            variant="primary"
            loading={isRegistering}
            disabled={!isFormFilled || !acceptTerms}
          >
            Create your Account
          </Button>
          <div className="w-full h-px bg-[#D9D9D9]" />
          <GoogleAuth actionText="Sign Up" />
          <AuthPrompt
            onClick={openLoginModal}
            text="Already have an EmiList account?"
            actionText="Login"
          />
        </div>
      </form>
      <PolicyModal isOpen={openPolicy} onClose={() => setOpenPolicy(false)} />
      <TermsOfUseModal isOpen={openTerms} onClose={() => setOpenTerms(false)} />
    </>
  );
};

export default SignUpForm;
