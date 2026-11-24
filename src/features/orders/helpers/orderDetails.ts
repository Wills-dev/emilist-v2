import type { CustomerOrder, Sale } from "../types/order";

export const formatOrderMoney = (amount?: number | null, currency = "NGN") => {
  if (amount == null || !Number.isFinite(amount)) return "N/A";
  return new Intl.NumberFormat("en-NG", { style: "currency", currency, maximumFractionDigits: 2 }).format(amount);
};

export const getDetailProducts = (order: CustomerOrder, sale?: Sale) => {
  if (!sale) return order.products;
  const line = order.products.find((product) => product._id === sale.saleId)
    ?? order.products.find((product) => product.productId === sale.product.id);
  return line ? [line] : [];
};
