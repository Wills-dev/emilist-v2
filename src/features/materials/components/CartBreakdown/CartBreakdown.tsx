import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import CartProductWrapper from "../CartProductWrapper/CartProductWrapper";
import PromoCode from "../PromoCode/PromoCode";
import OrderSummary from "../OrderSummary/OrderSummary";
import Shipping from "../Shipping/Shipping";
import Truck2 from "@/components/atoms/icons/Truck2";
import ShieldIcon from "@/components/atoms/icons/ShieldIcon";

import { routes } from "@/lib/helpers/routes";

const CartBreakdown = () => {
  return (
    <Container>
      <div className="pt-6 pb-15 space-y-10">
        <BackButton />
        <div className="w-full flex justify-between flex-wrap gap-6">
          <div className="max-w-197.75 w-full">
            <CartProductWrapper />
          </div>
          <div className="max-w-96.75 w-full space-y-8">
            <PromoCode />
            <OrderSummary href={routes?.cart} />
            <Shipping
              title="FRee shipping"
              icon={<Truck2 />}
              desc="On orders over $200"
            />
            <Shipping
              title="Secure packaging"
              icon={<ShieldIcon />}
              desc="Items safely packed & insured"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CartBreakdown;
