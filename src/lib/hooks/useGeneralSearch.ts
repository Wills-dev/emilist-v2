import { useState } from "react";

export const useGeneralSearch = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = () => {};

  return { handleSubmit, setSearch };
};
