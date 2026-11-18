export const supportInitials = (name: string) => name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "?";
export const supportMessageTime = (value: string) => value && Number.isFinite(new Date(value).getTime()) ? new Date(value).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "";
export const isSupportStaff = (role?: string) => Boolean(role && /admin|staff|support/i.test(role));
