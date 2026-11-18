"use client";
import { useState } from "react";
import type { SupportFaqCategory } from "../constants/supportFaqs";

export const useSupportFaq = () => {
  const [category, setCategory] = useState<SupportFaqCategory>("general");
  const [openId, setOpenId] = useState<number | null>(null);
  const changeCategory = (next: SupportFaqCategory) => { setCategory(next); setOpenId(null); };
  const toggleFaq = (id: number) => setOpenId((current) => current === id ? null : id);
  return { category, openId, changeCategory, toggleFaq };
};
