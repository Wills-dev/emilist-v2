const currencyConfig = {
  NGN: { rate: 1, symbol: "₦" },
  USD: { rate: 1500, symbol: "$" },
  EUR: { rate: 1650, symbol: "€" },
  CAD: { rate: 1100, symbol: "C$" },
} as const;

export type ReportCurrency = keyof typeof currencyConfig;

export const formatReportCurrency = (
  amountInNaira: number,
  currency: ReportCurrency,
) => {
  const { rate, symbol } = currencyConfig[currency];
  const convertedAmount = amountInNaira / rate;
  const formattedAmount = Math.round(convertedAmount).toLocaleString();

  return `${symbol} ${formattedAmount}`;
};
