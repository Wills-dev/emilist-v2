"use client";

import { useState } from "react";
import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import CartProductWrapper from "../CartProductWrapper/CartProductWrapper";
import WalletIcon from "@/components/atoms/icons/WalletIcon/WalletIcon";
import OrderSummary from "../OrderSummary/OrderSummary";
import SetAddress from "../SetAddress/SetAddress";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import CartPageSkeleton from "../CartPageSkeleton/CartPageSkeleton";
import { useGetCartItems } from "../../hooks/useGetCartItems";
import {
  getCartCurrency,
  getCartOrderSummary,
  getCartProductCount,
} from "../../helpers/cart";
import { useCheckoutCart } from "../../hooks/useCheckoutCart";
import type { CartPaymentMethod } from "@/features/payments/types/cartPayment";
import { toast } from "sonner";

const CheckoutWrapper = ({
  isDashboard = false,
}: {
  isDashboard?: boolean;
}) => {
  const { cart, isError, isLoading } = useGetCartItems();
  const [shippingAddress, setShippingAddress] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState<CartPaymentMethod>("Card");
  const { handleCheckout, isCheckingOut } = useCheckoutCart();
  const items = cart?.products ?? [];
  const productCount = getCartProductCount(cart);
  const currency = getCartCurrency(cart);
  const orderSummary = getCartOrderSummary(cart);
  const handlePayment = () => {
    if (!shippingAddress.trim()) {
      toast.error("Enter a delivery address to continue.");
      return;
    }

    handleCheckout(
      { shippingAddress: shippingAddress.trim(), orderNote: orderNote.trim() },
      paymentMethod,
      currency,
    );
  };

  if (isLoading) return <CartPageSkeleton dashboard={isDashboard} checkout />;

  if (isError || items.length === 0) {
    return (
      <Container variant={isDashboard ? "small" : "center"}>
        <div className="pt-6 pb-15 space-y-10">
          <BackButton isDashboard={isDashboard} />
          <EmptyState
            title={isError ? "Unable to load your cart" : "Your cart is empty"}
            description={
              isError
                ? "Please return to your cart and try again."
                : "Add materials to your cart before checking out."
            }
          />
        </div>
      </Container>
    );
  }

  return (
    <Container variant={isDashboard ? "small" : "center"}>
      <div className="pt-6 pb-15 space-y-10">
        <BackButton isDashboard={isDashboard} />
        <div
          className={`w-full flex justify-between flex-wrap ${isDashboard ? "gap4" : "gap-6"}`}
        >
          <div
            className={`w-full space-y-5.25 ${
              isDashboard ? "max-w-175" : "max-w-197.75"
            }`}
          >
            <CartProductWrapper
              icon={<WalletIcon />}
              title="Checkout"
              variant="secondary"
              items={items}
              productCount={productCount}
            />
            <OrderSummary
              handlePayment={handlePayment}
              actionTitle="Complete Payment"
              variant="secondary"
              productCount={productCount}
              orderSummary={orderSummary}
              currency={currency}
              isLoading={isCheckingOut}
              disabled={!shippingAddress.trim()}
            />
          </div>
          <div
            className={`w-full space-y-8 ${
              isDashboard ? "max-w-95" : "max-w-96.75"
            }`}
          >
            <SetAddress
              variant="secondary"
              value={shippingAddress}
              onChange={setShippingAddress}
            />
            <div className="space-y-2 rounded-[12.75px] border border-[#F1F2F9] bg-white p-4">
              <label
                htmlFor="order-note"
                className="text-xs font-medium text-[#737774]"
              >
                Order note (optional)
              </label>
              <textarea
                id="order-note"
                name="orderNote"
                value={orderNote}
                onChange={(event) => setOrderNote(event.target.value)}
                disabled={isCheckingOut}
                className="min-h-24 w-full rounded-[6.75px] border border-[#F1F2F9] bg-[#FDFDFD] p-2 text-xs disabled:opacity-50"
                placeholder="Add delivery instructions"
              />
            </div>
            <fieldset
              disabled={isCheckingOut}
              className="space-y-3 rounded-[12.75px] border border-[#F1F2F9] bg-white p-4"
            >
              <legend className="px-1 text-xs font-semibold">
                Payment method
              </legend>
              {(["Card", "Wallet"] as const).map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />
                  {method === "Card" ? "Card (Paystack)" : "Wallet"}
                </label>
              ))}
            </fieldset>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutWrapper;
