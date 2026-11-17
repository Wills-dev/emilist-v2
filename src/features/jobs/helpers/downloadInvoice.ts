import type { JobInvoice } from "../types/jobManagement";
import { getInvoiceDisplay } from "./invoiceDisplay";

/** Paid invoices generate receipts; invoice totals remain separate from actual payments. */
export async function downloadInvoice(invoice: JobInvoice) {
  const display = getInvoiceDisplay(invoice);
  const kind = display.paid ? "Receipt" : "Invoice";
  const identifier = invoice.invoiceId || (invoice.number !== "—" && invoice.number) || invoice.id;
  const logo = new Image();
  logo.src = "/assets/images/logo.svg";
  await logo.decode();
  const pages: HTMLCanvasElement[] = [];
  // newPage initializes the context before any drawing and on each page break.
  let ctx!: CanvasRenderingContext2D;
  let y = 220;
  const money = (amount: number) => `${invoice.currency} ${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const date = (value?: string, includeTime = false) => {
    const parsed = new Date(value ?? "");
    if (!Number.isFinite(parsed.getTime())) return "Not provided";
    return includeTime ? `${parsed.toLocaleString("en-GB", { timeZone: "UTC" })} UTC` : parsed.toLocaleDateString("en-GB", { timeZone: "UTC" });
  };
  const text = (value: string, x: number, top: number, size = 22, color = "#303632", bold = false) => {
    ctx.font = `${bold ? "bold " : ""}${size}px Arial`;
    ctx.fillStyle = color;
    ctx.fillText(value, x, top);
  };
  const newPage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1240;
    canvas.height = 1754;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Unable to create payment document");
    ctx = context;
    pages.push(canvas);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1240, 1754);
    ctx.drawImage(logo, 80, 75, 220, 220 * logo.naturalHeight / logo.naturalWidth);
    ctx.textAlign = "right";
    text(display.paid ? "PAYMENT RECEIPT" : "INVOICE", 1160, 115, 38, "#125c32", true);
    ctx.textAlign = "left";
    ctx.fillStyle = "#25c269";
    ctx.fillRect(80, 165, 1080, 5);
    ctx.fillStyle = "#e2e8ed";
    ctx.fillRect(80, 1600, 1080, 2);
    text("Thank you for choosing Emilist.", 80, 1650, 22, "#125c32", true);
    text(`Page ${pages.length}`, 1080, 1650, 18, "#768592");
    y = 220;
  };
  const ensure = (height: number) => { if (y + height > 1540) newPage(); };
  const paragraph = (value: string, size = 22, bold = false) => {
    // Wrap long descriptions and identifiers, including words without spaces.
    const lines = value.split("\n");
    for (const source of lines) {
      let line = "";
      for (const word of source.split(/\s+/)) {
        const candidate = line ? `${line} ${word}` : word;
        ctx.font = `${bold ? "bold " : ""}${size}px Arial`;
        if (ctx.measureText(candidate).width <= 1080) { line = candidate; continue; }
        if (line) { ensure(32); text(line, 80, y, size, "#303632", bold); y += 32; line = ""; }
        for (const character of word) {
          ctx.font = `${bold ? "bold " : ""}${size}px Arial`;
          if (line && ctx.measureText(line + character).width > 1080) { ensure(32); text(line, 80, y, size, "#303632", bold); y += 32; line = ""; }
          line += character;
        }
      }
      ensure(32); text(line, 80, y, size, "#303632", bold); y += 32;
    }
  };
  const field = (label: string, value: string) => {
    ensure(80);
    text(label.toUpperCase(), 80, y, 17, "#768592", true);
    y += 32;
    paragraph(value || "Not provided");
    y += 16;
  };
  const totalLine = (label: string, amount: number, bold = false) => {
    ensure(52);
    text(label, 80, y, 22, "#303632", bold);
    ctx.textAlign = "right";
    text(money(amount), 1160, y, 22, "#101828", bold);
    ctx.textAlign = "left";
    y += 48;
  };

  newPage();
  text(display.label.toUpperCase(), 80, y, 18, display.paid ? "#18a154" : "#b7791f", true);
  y += 42;
  ctx.fillStyle = "#f0fdf5";
  ctx.fillRect(80, y, 1080, 118);
  text(display.paid ? "AMOUNT PAID" : "INVOICE TOTAL", 105, y + 35, 17, "#125c32", true);
  text(display.paid ? invoice.amountPaid === undefined ? "Not provided" : money(invoice.amountPaid) : money(invoice.amount), 105, y + 83, 36, "#125c32", true);
  y += 160;
  field("Invoice ID", identifier);
  if (invoice.number && invoice.number !== "—" && invoice.number !== identifier) field("Invoice number", invoice.number);
  field(display.paid ? "Paid by" : "Billed to", invoice.billedTo);
  if (invoice.jobTitle) field("Job", invoice.jobTitle);
  if (invoice.jobId) field("Job ID", invoice.jobId);
  field("Milestone", invoice.milestone);
  if (invoice.milestoneId) field("Milestone ID", invoice.milestoneId);
  field("Invoice issued", date(invoice.issuedAt));
  field(display.paid ? "Payment date" : "Due date", date(display.paid ? invoice.paidAt : invoice.dueAt, display.paid));
  if (display.paid) {
    field("Payment method", invoice.paymentMethod === "Card" ? "Paystack (Card)" : invoice.paymentMethod ?? "");
    if (invoice.paymentReference) field("Payment reference", invoice.paymentReference);
  }
  ensure(200);
  text("COST BREAKDOWN", 80, y, 18, "#125c32", true);
  y += 45;
  totalLine("Job cost", invoice.subtotal ?? invoice.amount);
  if (invoice.additionalAmount !== undefined) totalLine("Additional costs", invoice.additionalAmount);
  totalLine("Invoice total", invoice.amount, true);
  if (invoice.note) { y += 24; field("Notes", invoice.note); }

  // Embed each rendered page as a high-resolution image in a standalone PDF.
  const encode = (value: string) => new TextEncoder().encode(value);
  const chunks: Uint8Array[] = [encode("%PDF-1.4\n")];
  const offsets = [0];
  let length = chunks[0].length;
  const append = (bytes: Uint8Array) => { chunks.push(bytes); length += bytes.length; };
  const object = (id: number, body: string, stream?: Uint8Array) => {
    offsets[id] = length;
    append(encode(`${id} 0 obj\n${body}\n`));
    if (stream) { append(encode("stream\n")); append(stream); append(encode("\nendstream\n")); }
    append(encode("endobj\n"));
  };
  object(1, "<< /Type /Catalog /Pages 2 0 R >>");
  object(2, `<< /Type /Pages /Kids [${pages.map((_, index) => `${3 + index * 3} 0 R`).join(" ")}] /Count ${pages.length} >>`);
  pages.forEach((canvas, index) => {
    const id = 3 + index * 3;
    const jpeg = Uint8Array.from(atob(canvas.toDataURL("image/jpeg", 0.95).split(",")[1]), (character) => character.charCodeAt(0));
    object(id, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Document ${id + 1} 0 R >> >> /Contents ${id + 2} 0 R >>`);
    object(id + 1, `<< /Type /XObject /Subtype /Image /Width 1240 /Height 1754 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>`, jpeg);
    const content = encode("q 595 0 0 842 0 0 cm /Document Do Q");
    object(id + 2, `<< /Length ${content.length} >>`, content);
  });
  const xref = length;
  const size = offsets.length;
  append(encode(`xref\n0 ${size}\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("")}trailer\n<< /Size ${size} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`));
  const url = URL.createObjectURL(new Blob(chunks as BlobPart[], { type: "application/pdf" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `Emilist-${kind}-${identifier.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
