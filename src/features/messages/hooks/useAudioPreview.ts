import { useCallback, useRef } from "react";

export const useAudioPreview = (file: File) => {
  const url = useRef<string | null>(null);
  return useCallback((element: HTMLAudioElement | null) => {
    if (url.current) { URL.revokeObjectURL(url.current); url.current = null; }
    if (element) { url.current = URL.createObjectURL(file); element.src = url.current; }
  }, [file]);
};
