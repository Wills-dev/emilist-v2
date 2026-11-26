export type PromotionType = "job" | "business" | "material";
export const promotionPlans = [7, 14, 21, 30, 45, 60, 90, 120].map((duration) => ({ duration, price: duration * 250 }));
export const promotionCopy = {
  job: { title: "Promote Job", description: "Get your job in front of more experts. Select a promotion plan to boost views and attract more applications." },
  business: { title: "Promote Business", description: "Help more customers discover your business. Select a promotion plan to boost views, enquiries and leads." },
  material: { title: "Promote Material", description: "Get your material in front of more buyers. Select a promotion plan to boost views, enquiries and sales." },
};
export const canPromote = (userId?: string, ownerId?: string) => Boolean(userId && ownerId && userId === ownerId);
export const validatePromotion = (id: string, type: PromotionType, duration: number) => {
  if (!id.trim() || !Object.hasOwn(promotionCopy, type) || !promotionPlans.some((plan) => plan.duration === duration)) throw new Error("Choose a valid listing and promotion plan.");
};
