import { ChangeEvent, useState } from "react";

export const useAuthState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputType, setInputType] = useState<"text" | "password">("password");
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

  const onCancel = () => setIsOpen(false);

  const resetForm = () => {
    setUserInfo({
      email: "",
      password: "",
    });
    setIsOpen(false);
    setInputType("password");
  };

  return {
    isOpen,
    setIsOpen,
    inputType,
    userInfo,
    handleChange,
    toggleInputType,
    onCancel,
    resetForm,
  };
};
