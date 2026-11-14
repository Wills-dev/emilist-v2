export interface PaymentCheckoutResponse {
  message?: string;
  status?: boolean | string;
  success?: boolean;
  authorizationUrl?: string;
  data?: {
    paymentLink?: string;
    authorization_url?: string;
    authorizationUrl?: string;
    checkoutUrl?: string;
  };
}

export const getPaymentCheckoutUrl = (response: PaymentCheckoutResponse) => {
  const checkout =
    response.data?.paymentLink ??
    response.data?.authorizationUrl ??
    response.data?.authorization_url ??
    response.data?.checkoutUrl ??
    response.authorizationUrl;
  if (!checkout)
    throw new Error(
      "No Paystack checkout link was returned. Refresh before trying again.",
    );
  const url = new URL(checkout);
  if (url.protocol !== "https:")
    throw new Error("The payment provider returned an invalid checkout link.");
  return url.href;
};

export const getPaymentReturnUrl = (path?: string) => {
  const appBaseUrl =
    process.env.NEXT_PUBLIC_WEB_URL?.trim() || window.location.origin;
  const currentPath = `${window.location.pathname}${window.location.search}`;
  const url = new URL(path ?? currentPath, appBaseUrl);
  // Do not reuse identifiers from an earlier checkout when starting another one.
  url.searchParams.delete("reference");
  url.searchParams.delete("trxref");
  url.hash = "";
  return url.href;
};
