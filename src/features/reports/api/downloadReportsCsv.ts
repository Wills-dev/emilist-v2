import { axiosInstance } from "@/lib/axiosInstance";
import type { FetchReportInput } from "../types/api";
import { reportParams } from "../helpers/reportParams";
export const downloadReportsCsv = async (filters: FetchReportInput) => {
  const response = await axiosInstance.get<Blob>("/reports/export", {
    params: reportParams(filters), responseType: "blob", headers: { Accept: "text/csv" },
  });
  if (/json|html/.test(String(response.headers["content-type"]))) throw new Error("The server did not return a CSV report.");
  const disposition = String(response.headers["content-disposition"] ?? "");
  const filename = disposition.match(/filename="?([^";]+)"?/)?.[1]?.split(/[\\/]/).pop()?.replace(/[\r\n]/g, "") || "emilist-report.csv";
  const url = URL.createObjectURL(response.data);
  const anchor = document.createElement("a");
  anchor.href = url; anchor.download = filename;
  document.body.appendChild(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
