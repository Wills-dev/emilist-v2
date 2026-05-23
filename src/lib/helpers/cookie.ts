import Cookies from "universal-cookie";

export const createCookie = (
  cookieName: string,
  cookieValue: string,
  isExpires?: Date,
): void => {
  const cookies = new Cookies();
  const defaultExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const expires = isExpires || defaultExpires;
  cookies.set(cookieName, cookieValue, {
    expires,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    ...(process.env.NEXT_PUBLIC_COOKIE_DOMAIN && {
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    }),
  });
};

export const readCookie = (cookieName: string) => {
  const cookies = new Cookies();
  return cookies.get(cookieName);
};

export const clearClear = (cookieName: string) => {
  const cookies = new Cookies();
  cookies.remove(cookieName, { path: "/" });
};
