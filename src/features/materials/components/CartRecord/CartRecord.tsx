"use client";

import Link from "next/link";
import { memo } from "react";

import CartIcon from "@/components/atoms/icons/CartIcon";

import { routes } from "@/lib/helpers/routes";
import { useGetCartItems } from "../../hooks/useGetCartItems";
import { getCartItemCount } from "../../helpers/cart";

const CartRecord = () => {
  const { cart } = useGetCartItems();
  const count = getCartItemCount(cart);

  return (
    <Link
      href={routes?.cart}
      className="bg-linear-to-b cursor-pointer from-0% from-[#25C269] to-100% to-[#125C32] py-2 pl-2 pr-3 rounded-full flex items-center gap-3 sm:h-[42.5px] h-[26.8px]"
    >
      <div className="flex items-center gap-2">
        <div className="sm:w-[26.5px] sm:h-[26.5px] w-[20.5px] h-[20.5px] rounded-full bg-[#25C269] text-[#F0FDF5] flex items-center justify-center sm:text-base text-xs">
          <CartIcon />
        </div>
        <span className="max-sm:text-xs font-semibold text-white">Cart</span>
      </div>
      <span className="bg-[#F0FFE6] py-0.2.5 px-1 rounded-full text-[#FF5D7A] text-sm font-semibold">
        {count}
      </span>
    </Link>
  );
};

export default memo(CartRecord);
