"use client";

import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import CartProductWrapper from "../CartProductWrapper/CartProductWrapper";
import WalletIcon from "@/components/atoms/icons/WalletIcon";
import OrderSummary from "../OrderSummary/OrderSummary";
import SetAddress from "../SetAddress/SetAddress";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCartItems } from "../../hooks/useGetCartItems";
import {
  getCartCurrency,
  getCartOrderSummary,
  getCartProductCount,
} from "../../helpers/cart";

const CheckoutWrapper = ({
  isDashboard = false,
}: {
  isDashboard?: boolean;
}) => {
  const { cart, isError, isLoading } = useGetCartItems();
  const items = cart?.products ?? [];
  const productCount = getCartProductCount(cart);
  const currency = getCartCurrency(cart);
  const orderSummary = getCartOrderSummary(cart);

  if (isLoading) {
    return (
      <Container variant={isDashboard ? "small" : "center"}>
        <div className="pt-6 pb-15 space-y-10">
          <Skeleton className="h-8.5 w-20 bg-gray-200" />
          <Skeleton className="h-125 w-full bg-gray-200" />
        </div>
      </Container>
    );
  }

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
              handlePayment={() => {}}
              actionTitle="Complete Payment"
              variant="secondary"
              productCount={productCount}
              orderSummary={orderSummary}
              currency={currency}
            />
          </div>
          <div
            className={`w-full space-y-8 ${
              isDashboard ? "max-w-95" : "max-w-96.75"
            }`}
          >
            <SetAddress variant="secondary" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutWrapper;
