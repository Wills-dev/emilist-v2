"use client";

import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import CartBag from "@/components/atoms/icons/CartBag";
import CartProductWrapper from "../CartProductWrapper/CartProductWrapper";
import PromoCode from "../PromoCode/PromoCode";
import OrderSummary from "../OrderSummary/OrderSummary";
import Shipping from "../Shipping/Shipping";
import Truck2 from "@/components/atoms/icons/Truck2";
import ShieldIcon from "@/components/atoms/icons/ShieldIcon";

import { routes } from "@/lib/helpers/routes";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCartItems } from "../../hooks/useGetCartItems";
import {
  getCartCurrency,
  getCartOrderSummary,
  getCartProductCount,
} from "../../helpers/cart";

const CartBreakdown = ({ isDashboard }: { isDashboard?: boolean }) => {
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
          <div className="flex flex-wrap gap-6">
            <Skeleton
              className={`h-125 min-w-72.5 flex-1 bg-gray-200 ${isDashboard ? "max-w-175" : "max-w-197.75"}`}
            />
            <Skeleton
              className={`h-96.75 min-w-72.5 flex-1 bg-gray-200 ${isDashboard ? "max-w-95" : "max-w-96.75"}`}
            />
          </div>
        </div>
      </Container>
    );
  }

  if (isError || items.length === 0) {
    return (
      <Container variant={isDashboard ? "small" : "center"}>
        <div className="pt-6 pb-15 space-y-10">
          <BackButton isDashboard />
          <EmptyState
            title={isError ? "Unable to load your cart" : "Your cart is empty"}
            description={
              isError
                ? "Please refresh the page and try again."
                : "Add materials to your cart to see them here."
            }
          />
        </div>
      </Container>
    );
  }

  return (
    <Container variant={isDashboard ? "small" : "center"}>
      <div className="pt-6 pb-15 space-y-10">
        <BackButton isDashboard />
        <div
          className={`w-full flex justify-between flex-wrap ${isDashboard ? "gap4" : "gap-6"}`}
        >
          <div
            className={` w-full ${isDashboard ? "max-w-175" : "max-w-197.75"}`}
          >
            <CartProductWrapper
              icon={<CartBag />}
              title="Cart"
              items={items}
              productCount={productCount}
            />
          </div>
          <div
            className={`w-full space-y-8 ${isDashboard ? "max-w-95" : "max-w-96.75"}`}
          >
            <PromoCode variant={isDashboard ? "tertiary" : "primary"} />
            <OrderSummary
              href={
                isDashboard
                  ? routes.dashboardLinks.dashboardCheckout
                  : routes.checkout
              }
              actionTitle="Proceed to Checkout"
              productCount={productCount}
              orderSummary={orderSummary}
              currency={currency}
              variant={isDashboard ? "tertiary" : "primary"}
            />
            <Shipping
              title="FRee shipping"
              icon={<Truck2 />}
              desc="On orders over $200"
              variant={isDashboard ? "tertiary" : "primary"}
            />
            <Shipping
              title="Secure packaging"
              icon={<ShieldIcon />}
              desc="Items safely packed & insured"
              variant={isDashboard ? "tertiary" : "primary"}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CartBreakdown;
