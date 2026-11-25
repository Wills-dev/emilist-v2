const pluralQuantityMetrics: Record<string, string> = {
  bag: "bags",
  bale: "bales",
  bar: "bars",
  block: "blocks",
  board: "boards",
  bottle: "bottles",
  box: "boxes",
  bucket: "buckets",
  bundle: "bundles",
  can: "cans",
  carton: "cartons",
  case: "cases",
  coil: "coils",
  container: "containers",
  crate: "crates",
  "cubic foot": "cubic feet",
  "cubic meter": "cubic meters",
  dozen: "dozen",
  drum: "drums",
  foot: "feet",
  gallon: "gallons",
  gram: "grams",
  kilogram: "kilograms",
  liter: "liters",
  meter: "meters",
  milliliter: "milliliters",
  millimeter: "millimeters",
  pack: "packs",
  packet: "packets",
  pair: "pairs",
  pallet: "pallets",
  piece: "pieces",
  "pipe length": "pipe lengths",
  ream: "reams",
  reel: "reels",
  roll: "rolls",
  roller: "rollers",
  rod: "rods",
  sack: "sacks",
  set: "sets",
  sheet: "sheets",
  "square foot": "square feet",
  "square meter": "square meters",
  stick: "sticks",
  tank: "tanks",
  ton: "tons",
  tube: "tubes",
  unit: "units",
  yard: "yards",
};

const matchMetricCasing = (metric: string, value: string) => {
  if (metric === metric.toUpperCase()) return value.toUpperCase();

  if (metric[0] === metric[0]?.toUpperCase()) {
    return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  return value;
};

export const pluralizeQuantityMetric = (quantity: number, metric: string) => {
  const trimmedMetric = metric.trim();

  if (!trimmedMetric) return trimmedMetric;
  const lower = trimmedMetric.toLowerCase();
  const singular = Object.keys(pluralQuantityMetrics).find((key) => pluralQuantityMetrics[key] === lower) ?? lower;
  if (!Number.isFinite(quantity) || quantity <= 1) return matchMetricCasing(trimmedMetric, singular);

  const pluralMetric = pluralQuantityMetrics[singular];

  return pluralMetric
    ? matchMetricCasing(trimmedMetric, pluralMetric)
    : /s$/i.test(trimmedMetric) || /^(kg|g|mg|ml|l|mm|cm|m|ft|in|m²|m³)$/i.test(trimmedMetric) ? trimmedMetric : `${trimmedMetric}s`;
};
