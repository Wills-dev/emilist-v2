import { useState } from "react";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { newsLetter } from "../api/newsLetter";
import { ApiErrorResponse } from "../types/error";
import { promiseErrorFunction } from "../helpers/promiseError";

export const useSubscribeNewsLetter = () => {
  const [email, setEmail] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: newsLetter,
    onSuccess: () => {
      toast.success("Success!", {
        description: "You have subscribe to emilist newsletter.",
      });
      setEmail("");
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error toggling like", error);
      promiseErrorFunction(error);
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() === "") {
      toast.error("Please enter your valid email address");
      return;
    }
    mutate({ email });
  };

  return {
    isPending,
    handleSubmit,
    email,
    setEmail,
  };
};
