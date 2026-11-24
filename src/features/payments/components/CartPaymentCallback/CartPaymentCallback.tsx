"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { CircleCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Button from "@/components/atoms/Button/Button";
import Container from "@/components/atoms/Container/Container";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { fetchOrder } from "@/features/orders/api/orders";
import { orderKeys } from "@/features/orders/queries/orderKeys";
import { routes } from "@/lib/helpers/routes";
import { useStore } from "@/store/authStore";
import { verifyPaystackPayment } from "../../api/fetchTransactions";
import { transactionKeys } from "../../queries/transactionKeys";

const subscribeHydration = () => () => {};
const hydratedClient = () => true;
const hydratedServer = () => false;

const CartPaymentCallback = () => {
  const searchParams = useSearchParams();
  const userId = useStore((state) => state.currentUser?._id);
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    hydratedClient,
    hydratedServer,
  );
  const reference =
    searchParams.get("reference") || searchParams.get("trxref") || "";
  const orderId = searchParams.get("orderId") || "";

  if (!hydrated || !userId) {
    return (
      <Container
        variant="small"
        className="flex min-h-[calc(100dvh-5rem)] items-center justify-center py-8"
      >
        <Skeleton className="mx-auto h-48 w-full max-w-lg" />
      </Container>
    );
  }

  return (
    <OrderPaymentConfirmation
      key={`${userId}:${orderId}:${reference}`}
      userId={userId}
      orderId={orderId}
      reference={reference}
    />
  );
};

const OrderPaymentConfirmation = ({
  userId,
  orderId,
  reference,
}: {
  userId: string;
  orderId: string;
  reference: string;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isCheckingAgain, setIsCheckingAgain] = useState(false);
  const order = useQuery({
    queryKey: orderKeys.detail(userId, orderId),
    queryFn: () => fetchOrder(orderId),
    enabled: Boolean(userId && orderId),
    retry: false,
    staleTime: 0,
  });
  const refetchOrder = order.refetch;
  const verification = useQuery({
    queryKey: transactionKeys.verification(userId, reference),
    queryFn: () => verifyPaystackPayment(reference),
    enabled: Boolean(userId && orderId && reference),
    retry: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const successful = order.data?.paymentStatus === "paid";
  const failed = order.data?.paymentStatus === "failed";
  const checking =
    isCheckingAgain ||
    (Boolean(orderId) && order.isPending) ||
    (Boolean(reference) && verification.isPending && !successful);
  const error = !orderId || order.isError;

  useEffect(() => {
    if (successful) {
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: orderKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: transactionKeys.all }),
      ]);
    }
  }, [queryClient, successful]);

  useEffect(() => {
    if (
      orderId &&
      reference &&
      (verification.isSuccess || verification.isError)
    ) {
      void refetchOrder();
    }
  }, [
    orderId,
    refetchOrder,
    reference,
    verification.dataUpdatedAt,
    verification.errorUpdatedAt,
    verification.isError,
    verification.isSuccess,
  ]);

  const checkAgain = async () => {
    setIsCheckingAgain(true);
    try {
      if (reference) await verification.refetch();
      await refetchOrder();
    } finally {
      setIsCheckingAgain(false);
    }
  };

  const title = !orderId
    ? "Order reference unavailable"
    : error
      ? "Unable to confirm payment"
      : checking
        ? "Checking your payment…"
        : successful
          ? "Order payment successful"
          : failed
            ? "Payment failed"
            : "Payment is awaiting confirmation";

  const description = !orderId
    ? "Return to your orders to review your payment status."
    : error
      ? "We couldn’t confirm this order. Check its status before starting another payment."
      : successful
        ? "Your payment is confirmed. Your order and payment status will be available in your orders."
        : failed
          ? "This payment was not successful. Review the order status before trying again."
          : "Confirmation may take a little longer. You can check again without starting another payment.";

  return (
    <Container
      variant="small"
      className="flex min-h-[calc(100dvh-5rem)] items-center justify-center py-8"
    >
      <section className="mx-auto w-full max-w-lg space-y-5 rounded-xl bg-white p-6 text-center">
        {successful && !checking && (
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#EAFBF1]">
            <CircleCheck
              className="size-12 text-[#18A154]"
              aria-hidden="true"
              strokeWidth={1.75}
            />
          </div>
        )}
        <h1 className="font-exo text-xl font-semibold text-[#303632]">
          {title}
        </h1>
        {checking && (
          <div role="status" aria-label="Checking order payment">
            <Skeleton className="mx-auto h-5 w-2/3" />
          </div>
        )}
        <p className="text-sm leading-6 text-[#737774]">{description}</p>
        {orderId && (
          <p className="text-xs text-[#8A8D8B] wrap-anywhere">
            Order: {orderId}
          </p>
        )}
        {reference && (
          <p className="text-xs text-[#8A8D8B] wrap-anywhere">
            Reference: {reference}
          </p>
        )}
        {order.isError && (
          <p role="alert" className="text-sm text-[#737774]">
            Unable to fetch the latest order status. Return to your orders to
            retry.
          </p>
        )}
        {orderId && !successful && !failed && (
          <Button
            variant="default"
            className="w-full"
            loading={isCheckingAgain}
            onClick={() => void checkAgain()}
          >
            Check Again
          </Button>
        )}
        <Button
          variant="primary"
          className="w-full"
          onClick={() => router.replace(routes.dashboardLinks.orders)}
        >
          View Orders
        </Button>
      </section>
    </Container>
  );
};

export default CartPaymentCallback;
