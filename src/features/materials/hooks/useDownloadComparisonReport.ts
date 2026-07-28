"use client";

import { toast } from "sonner";

import { buildComparisonExcel } from "../helpers/buildComparisonExcel";
import { ComparedProduct } from "../types";

export const useDownloadComparisonReport = (products: ComparedProduct[]) => {
  const downloadReport = () => {
    if (!products.length) return;

    const workbook = buildComparisonExcel(products);
    const blob = new Blob([workbook], {
      type: "application/vnd.ms-excel;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `material-comparison-${new Date()
      .toISOString()
      .slice(0, 10)}.xls`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    toast.success("Comparison report downloaded.");
  };

  return { downloadReport, canDownload: products.length > 0 };
};
