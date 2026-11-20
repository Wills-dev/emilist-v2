"use client";

import { useEffect, useState } from "react";

import { fetchOrder } from "@/features/orders/api/orders";
import { routes } from "@/lib/helpers/routes";
import { verifyPaystackPayment } from "../../api/fetchTransactions";

type CallbackStatus = "verifying" | "successful" | "failed";

const CartPaymentCallback = () => {
  const [status, setStatus] = useState<CallbackStatus>("verifying");
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    let active = true;

    const verifyPayment = async () => {
      const params = new URLSearchParams(window.location.search);
      const reference =
        params.get("reference") ?? params.get("trxref") ?? undefined;
      const orderId = params.get("orderId");

      if (!orderId) {
        setStatus("failed");
        setMessage("The order could not be identified.");
        return;
      }

      let verificationError: string | undefined;
      if (reference) {
        try {
          await verifyPaystackPayment(reference);
        } catch (error) {
          verificationError =
            error instanceof Error
              ? error.message
              : "Payment verification could not be completed.";
        }
      }

      try {
        const order = await fetchOrder(orderId);
        if (!active) return;

        if (order.paymentStatus === "paid") {
          setStatus("successful");
          setMessage("Payment successful.");
          return;
        }

        setStatus("failed");
        setMessage(
          verificationError ??
            "The order is not marked as paid. Check your orders before trying again.",
        );
      } catch (error) {
        if (!active) return;
        setStatus("failed");
        setMessage(
          error instanceof Error
            ? error.message
            : verificationError ?? "Unable to fetch your order status.",
        );
      }
    };

    void verifyPayment();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="mx-auto max-w-2xl space-y-4 px-5 py-16 text-center">
      <h1 className="font-exo text-2xl font-semibold">
        {status === "verifying"
          ? "Confirming payment"
          : status === "successful"
            ? "Payment confirmed"
            : "Payment not confirmed"}
      </h1>
      <p role="status">{message}</p>
      {status !== "verifying" && (
        <a
          href={routes.dashboardLinks.orders}
          className="inline-flex rounded-lg bg-[#25C269] px-5 py-3 font-semibold text-white"
        >
          View my orders
        </a>
      )}
    </main>
  );
};

export default CartPaymentCallback;
