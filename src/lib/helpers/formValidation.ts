import { toast } from "sonner";

// Wait for a step change or an expanding section before focusing its control.
export const focusValidationTarget = (selector: string) => {
  if (typeof document === "undefined") return;
  window.requestAnimationFrame(() => {
    const focus = () => {
      const target = document.querySelector<HTMLElement>(selector);
      if (!target) return false;
      const container = target.matches('input[type="hidden"]') ? target.parentElement : target;
      if (!container) return false;
      const control = container.matches('input:not([type="hidden"]), select, textarea, button, [contenteditable="true"]')
        ? container : container.querySelector<HTMLElement>('input:not([type="hidden"]), select, textarea, [contenteditable="true"], button');
      const visibleTarget = control?.matches('input[type="file"], input[type="radio"]') ? control.closest("label") ?? container : container;
      visibleTarget.style.scrollMarginTop = "112px";
      visibleTarget.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
      if (control) control.focus({ preventScroll: true });
      else { container.tabIndex = -1; container.focus({ preventScroll: true }); }
      return true;
    };
    if (focus()) return;
    const observer = new MutationObserver(() => { if (focus()) observer.disconnect(); });
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 1500);
  });
};

export const reportFormError = (field: string, message: string) => {
  toast.error(message);
  focusValidationTarget(`[data-validation-field="${field}"], [name="${field}"]:not([type="hidden"]), [id="${field}"]`);
  return false;
};

export const hasRichText = (value: string) => Boolean(value.replace(/<[^>]*>/g, " ").replace(/&nbsp;|&#160;/g, " ").trim());
