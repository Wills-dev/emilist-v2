export const useImagePreview = (onCancel: () => void) => {
  const close = (open: boolean) => { if (!open) onCancel(); };
  return { close };
};
