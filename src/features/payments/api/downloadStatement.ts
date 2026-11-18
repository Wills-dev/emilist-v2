import { axiosInstance } from "@/lib/axiosInstance";
import type { StatementQuery } from "../types/statement";

export const downloadStatement = async (params: StatementQuery) => {
  if (!["pdf", "csv"].includes(params.format)) throw new Error("Choose PDF or CSV.");
  const response = await axiosInstance.get<Blob>("/transaction/download-statement", { params, responseType: "blob" });
  const disposition = String(response.headers["content-disposition"] ?? "");
  const encoded = disposition.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
  let filename = disposition.match(/filename="?([^";]+)"?/i)?.[1] || `emilist-statement.${params.format}`;
  if (encoded) { try { filename = decodeURIComponent(encoded); } catch { /* Use the ordinary filename. */ } }
  filename = filename.split(/[\\/]/).pop() || `emilist-statement.${params.format}`;
  const url = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = url; link.download = filename;
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
