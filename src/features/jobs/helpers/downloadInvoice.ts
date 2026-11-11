import type { JobInvoice } from "../types/jobManagement";
import { getInvoiceDisplay } from "./invoiceDisplay";

// Render locally so invoices remain downloadable without a server-generated file.
export async function downloadInvoice(invoice: JobInvoice) {
  const canvas = document.createElement("canvas");
  canvas.width = 1240;
  canvas.height = 1754;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Unable to create invoice");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const text = (value: string, x: number, y: number, size = 22, color = "#303632", bold = false) => {
    ctx.font = `${bold ? "bold " : ""}${size}px Arial`;
    ctx.fillStyle = color;
    ctx.fillText(value, x, y);
  };
  const wrap = (value: string, x: number, y: number, width: number) => {
    ctx.font = "22px Arial";
    let line = "";
    for (const word of value.split(/\s+/)) {
      if (ctx.measureText(`${line} ${word}`).width > width && line) {
        text(line, x, y);
        y += 32;
        line = word;
      } else line = `${line} ${word}`.trim();
    }
    text(line, x, y);
    return y + 32;
  };
  const logo = new Image();
  logo.src = "/assets/images/logo.svg";
  await logo.decode();
  ctx.drawImage(logo, 80, 75, 220, 220 * logo.naturalHeight / logo.naturalWidth);
  text("INVOICE", 830, 120, 48, "#125c32", true);
  ctx.fillStyle = "#25c269";
  ctx.fillRect(80, 180, 1080, 5);
  const identifier = invoice.invoiceId || invoice.number || invoice.id;
  text("INVOICE NUMBER", 80, 235, 17, "#768592", true);
  text(invoice.number && invoice.number !== "—" ? invoice.number : identifier, 80, 270, 22, "#101828", true);
  if (invoice.invoiceId && invoice.number !== "—") text(`ID: ${invoice.invoiceId}`, 80, 305, 18, "#768592");
  text(getInvoiceDisplay(invoice).label.toUpperCase(), 940, 265, 22, "#18a154", true);
  text("BILLED TO", 80, 380, 17, "#768592", true);
  wrap(invoice.billedTo, 80, 420, 580);
  const date = (value: string) => {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? "—" : parsed.toLocaleDateString("en-GB", { timeZone: "UTC" });
  };
  text(`Issued: ${date(invoice.issuedAt)}`, 800, 390, 20);
  text(`Due: ${date(invoice.dueAt)}`, 800, 425, 20);
  ctx.fillStyle = "#f0fdf5";
  ctx.fillRect(80, 500, 1080, 64);
  text("DESCRIPTION", 105, 540, 18, "#125c32", true);
  const money = (amount: number) => `${invoice.currency} ${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  let y = wrap(invoice.milestone, 105, 610, 1020) + 60;
  const totalLine = (label: string, amount: number, bold = false) => {
    text(label, 700, y, 22, "#303632", bold);
    ctx.textAlign = "right";
    text(money(amount), 1135, y, 22, "#101828", bold);
    ctx.textAlign = "left";
    y += 48;
  };
  totalLine("Subtotal", invoice.subtotal ?? invoice.amount);
  if (invoice.additionalAmount !== undefined) totalLine("Additional costs", invoice.additionalAmount);
  totalLine("TOTAL", invoice.amount, true);
  if (invoice.note) {
    text("NOTES", 80, y + 40, 17, "#768592", true);
    wrap(invoice.note, 80, y + 80, 1080);
  }
  ctx.fillStyle = "#e2e8ed";
  ctx.fillRect(80, 1600, 1080, 2);
  text("Thank you for choosing Emilist.", 80, 1650, 22, "#125c32", true);

  const jpeg = Uint8Array.from(atob(canvas.toDataURL("image/jpeg", 0.95).split(",")[1]), (c) => c.charCodeAt(0));
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
  object(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  object(3, "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Invoice 4 0 R >> >> /Contents 5 0 R >>");
  object(4, `<< /Type /XObject /Subtype /Image /Width 1240 /Height 1754 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>`, jpeg);
  const content = encode("q 595 0 0 842 0 0 cm /Invoice Do Q");
  object(5, `<< /Length ${content.length} >>`, content);
  const xref = length;
  append(encode(`xref\n0 6\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("")}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`));
  const blob = new Blob(chunks as BlobPart[], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Emilist-Invoice-${identifier.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
