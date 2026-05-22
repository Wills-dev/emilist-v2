"use client";

import { SubmitEvent, useState } from "react";

import clsx from "clsx";

import { SearchBarProps } from "@/lib/types";

const SearchBar = ({
  setSearch,
  placeholder,
  variant = "primary",
  onSubmit,
  onVoiceCommand,
  showVoiceIcon = true,
  onShowSearchOverlay,
}: SearchBarProps) => {
  const [value, setValue] = useState("");

  const baseStyle =
    "rounded-full w-full border flex items-center justify-between font-exo";

  const inputBaseStyle = "outline-none bg-inherit flex-1 w-full h-full";

  const variants = {
    primary: {
      base: "bg-white max-w-228.5 md:pl-8 pl-4 md:pr-6 pr-3 sm:py-5 py-3 border-[#F1F2F9] focus-within:border-[#25C269]  sm:gap-3 gap-2",
      icon: "text-[#25C269] sm:text-xl text-lg cursor-pointer",
      input: "placeholder:text-[#737774] placeholder:font-medium",
      button:
        "sm:text-xl text-lg text-[#737774] hover:text-[#25C269] cursor-pointer",
    },
    secondary: {
      base: "bg-white max-w-228.5 md:pl-8 pl-4 md:pr-6 pr-3 py-5 border-[#F1F2F9]",
      icon: "",
      input: "outline-none ",
      button: "",
    },
  };

  const styles = variants[variant];

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (value.trim() === "") {
      return;
    }
    setSearch(value);

    if (onSubmit !== undefined) {
      onSubmit();
    }
  };

  return (
    <form className={clsx(baseStyle, styles.base)} onSubmit={handleSubmit}>
      <button className={clsx(styles.button)} type="submit">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[1em] h-[1em]"
        >
          <path
            d="M21 21L16.66 16.66M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <input
        type="search"
        name="value"
        id="value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={clsx(styles?.input, inputBaseStyle)}
      />
      <div className="flex items-center md:gap-4 gap-2">
        {showVoiceIcon && (
          <button
            type="button"
            className={clsx(styles?.icon)}
            onClick={onVoiceCommand}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[1em] h-[1em]"
            >
              <path
                d="M12 19V22M5 10V12C5 13.8565 5.7375 15.637 7.05025 16.9497C8.36301 18.2625 10.1435 19 12 19C13.8565 19 15.637 18.2625 16.9497 16.9497C18.2625 15.637 19 13.8565 19 12V10M12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {variant === "primary" && (
          <button
            onClick={onShowSearchOverlay}
            className="sm:text-xl text-lg cursor-pointer sm:block hidden"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[1em] h-[1em]"
            >
              <path
                d="M10.0003 13.9995C9.41693 13.9995 8.83359 13.7745 8.39193 13.3329L2.95859 7.89954C2.71693 7.65788 2.71693 7.25788 2.95859 7.01621C3.20026 6.77454 3.60026 6.77454 3.84193 7.01621L9.27526 12.4495C9.67526 12.8495 10.3253 12.8495 10.7253 12.4495L16.1586 7.01621C16.4003 6.77454 16.8003 6.77454 17.0419 7.01621C17.2836 7.25788 17.2836 7.65788 17.0419 7.89954L11.6086 13.3329C11.1669 13.7745 10.5836 13.9995 10.0003 13.9995Z"
                fill="#474C48"
              />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
