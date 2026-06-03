import { ChangeEvent, useState } from "react";

export const useAuthState = () => {
  const [inputType, setInputType] = useState<"text" | "password">("password");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const toggleInputType = () => {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  const resetForm = () => {
    setUserInfo({
      email: "",
      password: "",
    });

    setInputType("password");
  };

  return {
    inputType,
    userInfo,
    handleChange,
    toggleInputType,
    resetForm,
    acceptTerms,
    setAcceptTerms,
    openPolicy,
    setOpenPolicy,
    openTerms,
    setOpenTerms,
  };
};
