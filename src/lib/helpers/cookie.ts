import Cookies from "universal-cookie";

export const AUTH_COOKIE_CHANGE_EVENT = "emilist-auth-cookie-change";

const notifyAuthCookieChange = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_COOKIE_CHANGE_EVENT));
  }
};

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
  notifyAuthCookieChange();
};

export const clearAllCookies = () => {
  const cookies = new Cookies();
  const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN;

  Object.keys(cookies.getAll()).forEach((cookieName) => {
    cookies.remove(cookieName, { path: "/" });

    if (cookieDomain) {
      cookies.remove(cookieName, {
        path: "/",
        domain: cookieDomain,
      });
    }
  });

  notifyAuthCookieChange();
};
