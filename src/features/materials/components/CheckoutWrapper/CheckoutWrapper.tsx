"use client";

import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import CartProductWrapper from "../CartProductWrapper/CartProductWrapper";
import WalletIcon from "@/components/atoms/icons/WalletIcon";
import OrderSummary from "../OrderSummary/OrderSummary";
import SetAddress from "../SetAddress/SetAddress";

const CheckoutWrapper = () => {
  return (
    <Container>
      <div className="pt-6 pb-15 space-y-10">
        <BackButton />
        <div className="w-full flex justify-between flex-wrap gap-6">
          <div className="max-w-197.75 w-full space-y-5.25">
            <CartProductWrapper
              icon={<WalletIcon />}
              title="Checkout"
              variant="secondary"
            />
            <OrderSummary
              handlePayment={() => {}}
              actionTitle="Complete Payment"
              variant="secondary"
            />
          </div>
          <div className="max-w-96.75 w-full space-y-8">
            <SetAddress />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutWrapper;
