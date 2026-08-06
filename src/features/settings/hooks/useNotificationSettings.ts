"use client";

import { useState } from "react";

export const useNotificationSettings = () => {
  const [allowNewMessages, setAllowNewMessages] = useState(true);
  const [allowEmail, setAllowEmail] = useState(true);

  return {
    allowNewMessages,
    setAllowNewMessages,
    allowEmail,
    setAllowEmail,
  };
};
