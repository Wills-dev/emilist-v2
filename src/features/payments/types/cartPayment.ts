export type CartPaymentMethod = "Wallet" | "Card";
export type CartPaymentCurrency = "NGN" | "USD" | "GBP" | "EUR" | "CAD";

export interface PayForCartPayload {
  cartId: string;
  paymentMethod: CartPaymentMethod;
  currency: CartPaymentCurrency;
  redirectUrl: string;
}

export interface CardCartPayment {
  paymentLink: string;
  transaction: {
    _id: string;
    reference: string;
    status: string;
    cartId: string;
    orderId: string;
    amount: number;
  };
}

export type PayForCartResponse = string | CardCartPayment;
