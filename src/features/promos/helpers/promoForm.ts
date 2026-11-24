import type { CreatePromoPayload, PromoFormValues, SellerPromo, UpdatePromoPayload } from "../types";

// Promo dates are entered in Africa/Lagos (UTC+1), independently of the browser's timezone.
export const promoDateInput = (value: string) => {
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? new Date(timestamp + 60 * 60 * 1000).toISOString().slice(0, 16) : "";
};
const expiryIso = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) throw new Error("Choose an expiry date and time.");
  const date = new Date(`${value}:00+01:00`);
  if (!Number.isFinite(date.getTime())) throw new Error("Choose a valid expiry date.");
  const iso = date.toISOString();
  if (promoDateInput(iso) !== value) throw new Error("Choose a valid expiry date.");
  return iso;
};
export const initialPromoForm = (productId: string, promo?: SellerPromo): PromoFormValues => ({
  code: promo?.code || "", productIds: promo ? promo.products.map((product) => product.id) : [productId],
  discountPercentage: promo ? String(promo.discountPercentage) : "", expiryDate: promo ? promoDateInput(promo.expiryDate) : "",
  isSingleUse: promo?.isSingleUse ?? false, isActive: promo?.isActive ?? true,
});
export const buildPromoPayload = (form: PromoFormValues, promo?: SellerPromo, now = Date.now()): CreatePromoPayload | UpdatePromoPayload => {
  if (!form.productIds.length || form.productIds.length > 50) throw new Error("Select between 1 and 50 products.");
  if (new Set(form.productIds).size !== form.productIds.length || form.productIds.some((id) => !id.trim())) throw new Error("Select each product only once.");
  const percentage = Number(form.discountPercentage);
  if (!form.discountPercentage.trim() || !Number.isFinite(percentage) || percentage < 1 || percentage > 100) throw new Error("Enter a discount between 1 and 100 percent.");
  if (!promo) {
    const code = form.code.trim().toUpperCase();
    if (code && !/^[A-Z0-9]{3,20}$/.test(code)) throw new Error("Use 3–20 letters and numbers for the promo code.");
    const expiryDate = expiryIso(form.expiryDate);
    if (Date.parse(expiryDate) <= now) throw new Error("The expiry date must be in the future.");
    return { ...(code ? { code } : {}), productIds: form.productIds, discountPercentage: percentage, expiryDate, isSingleUse: form.isSingleUse };
  }
  const patch: UpdatePromoPayload = {};
  if (percentage !== promo.discountPercentage) patch.discountPercentage = percentage;
  if (form.expiryDate !== promoDateInput(promo.expiryDate)) {
    const expiryDate = expiryIso(form.expiryDate);
    if (Date.parse(expiryDate) <= now) throw new Error("The expiry date must be in the future.");
    patch.expiryDate = expiryDate;
  }
  if (form.isActive !== promo.isActive) {
    if (form.isActive && Date.parse(patch.expiryDate || promo.expiryDate) <= now) throw new Error("Set a future expiry date before enabling this promo.");
    patch.isActive = form.isActive;
  }
  if ([...form.productIds].sort().join(",") !== promo.products.map((p) => p.id).sort().join(",")) patch.productIds = form.productIds;
  if (!Object.keys(patch).length) throw new Error("Make a change before saving.");
  return patch;
};
