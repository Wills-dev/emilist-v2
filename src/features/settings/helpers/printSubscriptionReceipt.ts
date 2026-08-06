import { SubscriptionHistoryItem } from "../types/subscription";

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#039;",
        '"': "&quot;",
      })[character] ?? character,
  );

export const printSubscriptionReceipt = (item: SubscriptionHistoryItem) => {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("title", `Receipt ${item.id}`);
  iframe.style.position = "fixed";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.visibility = "hidden";

  const fields = [
    ["Receipt ID", item.id],
    ["Description", item.description],
    ["Issue date", item.issueDate],
    ["Date paid", item.datePaid],
    ["Payment status", item.status],
    ["Receipt file", item.receipt],
  ];

  iframe.srcdoc = `<!doctype html>
    <html>
      <head>
        <title>Emilist receipt ${escapeHtml(item.id)}</title>
        <style>
          * { box-sizing: border-box; }
          body { margin: 0; padding: 40px; color: #202521; font: 14px Arial, sans-serif; }
          .receipt { max-width: 680px; margin: 0 auto; border: 1px solid #ececec; border-radius: 16px; overflow: hidden; }
          .header { display: flex; justify-content: space-between; align-items: center; padding: 28px 32px; background: #f4f7f5; border-bottom: 1px solid #ececec; }
          .brand { font-size: 28px; font-weight: 700; }
          .brand span { color: #25c269; }
          h1 { margin: 0; font-size: 20px; }
          .body { padding: 28px 32px; }
          .amount { margin-bottom: 28px; padding: 22px; border-radius: 12px; background: #eafbf1; text-align: center; }
          .amount small { display: block; margin-bottom: 6px; color: #667085; }
          .amount strong { color: #07883e; font-size: 30px; }
          .row { display: flex; justify-content: space-between; gap: 24px; padding: 14px 0; border-bottom: 1px solid #ececec; }
          .label { color: #737774; }
          .value { font-weight: 600; text-align: right; }
          .status { color: #07883e; }
          .footer { padding-top: 28px; color: #737774; text-align: center; font-size: 12px; }
          @page { margin: 18mm; }
        </style>
      </head>
      <body>
        <main class="receipt">
          <header class="header"><div class="brand"><span>●</span> emilist</div><h1>Subscription Receipt</h1></header>
          <section class="body">
            <div class="amount"><small>Amount paid</small><strong>₦${item.amount.toLocaleString()}</strong></div>
            ${fields.map(([label, value]) => `<div class="row"><span class="label">${escapeHtml(label)}</span><span class="value${label === "Payment status" ? " status" : ""}">${escapeHtml(value)}</span></div>`).join("")}
            <p class="footer">Thank you for your subscription payment.</p>
          </section>
        </main>
      </body>
    </html>`;

  iframe.onload = () => {
    const printWindow = iframe.contentWindow;
    if (!printWindow) {
      iframe.remove();
      return;
    }

    printWindow.addEventListener("afterprint", () => iframe.remove(), {
      once: true,
    });
    printWindow.focus();
    printWindow.print();
  };

  document.body.appendChild(iframe);
};
