import { Transaction } from "../types";

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" })[character] ?? character);

export const printTransactionReceipt = (transaction: Transaction) => {
  const logoUrl = new URL("/assets/images/logo.svg", window.location.origin).href;
  const iframe = document.createElement("iframe");
  iframe.setAttribute("title", `Receipt ${transaction.id}`);
  Object.assign(iframe.style, { position: "fixed", width: "0", height: "0", border: "0", visibility: "hidden" });
  const fields = [
    ["Transaction ID", transaction.id],
    ["Date", transaction.date],
    ["Counterparty", transaction.counterparty],
    ["Transaction type", transaction.type],
    ["Status", transaction.status],
  ];

  iframe.srcdoc = `<!doctype html><html><head><title>Emilist receipt ${escapeHtml(transaction.id)}</title>
    <style>
      *{box-sizing:border-box}body{margin:0;padding:40px;color:#202521;font:14px Arial,sans-serif}.receipt{max-width:680px;margin:auto;border:1px solid #ececec;border-radius:16px;overflow:hidden}.header{display:flex;justify-content:space-between;align-items:center;padding:28px 32px;background:#f4f7f5;border-bottom:1px solid #ececec}.brand-logo{display:block;width:120px;height:auto}h1{margin:0;font-size:20px}.body{padding:28px 32px}.amount{margin-bottom:28px;padding:22px;border-radius:12px;background:${transaction.type === "inflow" ? "#eafbf1" : "#fff0f3"};text-align:center}.amount small{display:block;margin-bottom:6px;color:#667085}.amount strong{color:${transaction.type === "inflow" ? "#07883e" : "#ff5d7a"};font-size:30px}.row{display:flex;justify-content:space-between;gap:24px;padding:14px 0;border-bottom:1px solid #ececec}.label{color:#737774}.value{font-weight:600;text-align:right;text-transform:capitalize}.footer{padding-top:28px;color:#737774;text-align:center;font-size:12px}@page{margin:18mm}
    </style></head><body><main class="receipt"><header class="header"><img class="brand-logo" src="${escapeHtml(logoUrl)}" alt="Emilist" /><h1>Transaction Receipt</h1></header><section class="body"><div class="amount"><small>${transaction.type === "inflow" ? "Amount received" : "Amount paid"}</small><strong>₦${transaction.amount.toLocaleString()}</strong></div>${fields.map(([label, value]) => `<div class="row"><span class="label">${escapeHtml(label)}</span><span class="value">${escapeHtml(String(value))}</span></div>`).join("")}<p class="footer">Generated from your Emilist transaction history.</p></section></main></body></html>`;

  iframe.onload = () => {
    const printWindow = iframe.contentWindow;
    if (!printWindow) return iframe.remove();
    printWindow.addEventListener("afterprint", () => iframe.remove(), { once: true });
    printWindow.focus();
    printWindow.print();
  };
  document.body.appendChild(iframe);
};
