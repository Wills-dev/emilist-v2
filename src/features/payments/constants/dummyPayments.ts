import { MonthlyTransaction, Transaction, Wallet } from "../types";

export const wallets: Wallet[] = [
  {
    id: "wallet-ngn",
    name: "Wallet 1",
    currency: "NGN",
    balance: 150000,
    bank: "GTBank",
    accountNumber: "012345677",
  },
  {
    id: "wallet-usd",
    name: "USD Wallet",
    currency: "USD",
    balance: 2450,
    bank: "Access Bank",
    accountNumber: "019283746",
  },
  {
    id: "wallet-eur",
    name: "EUR Wallet",
    currency: "EUR",
    balance: 1870,
    bank: "Zenith Bank",
    accountNumber: "018273645",
  },
  {
    id: "wallet-cad",
    name: "CAD Wallet",
    currency: "CAD",
    balance: 3200,
    bank: "UBA",
    accountNumber: "017263544",
  },
];

const statuses = ["successful", "pending", "failed"] as const;

export const transactions: Transaction[] = Array.from(
  { length: 60 },
  (_, index) => {
    const type = index % 3 === 0 ? "inflow" : "outflow";
    return {
      id: `#${3066 - index}`,
      date: `${String((index % 27) + 1).padStart(2, "0")}/04/${index > 39 ? 2025 : 2026}`,
      amount: index % 4 === 0 ? 500000 : index % 5 === 0 ? 1400000 : 150000,
      counterparty: type === "inflow" ? "Sender Name" : "Recipient Name",
      type,
      status: statuses[index % statuses.length],
      year: index > 49 ? 2025 : 2026,
    };
  },
);

export const monthlyTransactions: MonthlyTransaction[] = [
  ["Jan", 11000000, 9500000],
  ["Feb", 6500000, 12000000],
  ["Mar", 6200000, 9000000],
  ["Apr", 3000000, 7600000],
  ["May", 12000000, 8200000],
  ["Jun", 6000000, 8700000],
  ["Jul", 5900000, 10500000],
  ["Aug", 7600000, 9200000],
  ["Sep", 2800000, 6500000],
  ["Oct", 12500000, 9000000],
  ["Nov", 4500000, 11000000],
  ["Dec", 2600000, 10600000],
].map(([month, inflow, outflow]) => ({
  month: String(month),
  inflow: Number(inflow),
  outflow: Number(outflow),
}));
