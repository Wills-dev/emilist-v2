"use client";
import { useState, type ChangeEvent, type MouseEvent } from "react";
import { toast } from "sonner";
import { validateSupportFiles } from "../helpers/supportOptions";

export const useSupportFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  const select = (event: ChangeEvent<HTMLInputElement>) => {
    const next = [...files, ...Array.from(event.target.files ?? [])];
    try { validateSupportFiles(next); setFiles(next); } catch (error) { toast.error((error as Error).message); }
    event.target.value = "";
  };
  const remove = (event: MouseEvent<HTMLButtonElement>) => { const index = Number(event.currentTarget.dataset.index); setFiles((files) => files.filter((_, i) => i !== index)); };
  const clear = () => setFiles([]);
  return { files, select, remove, clear };
};
