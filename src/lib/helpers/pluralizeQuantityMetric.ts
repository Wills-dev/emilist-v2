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

  if (!trimmedMetric || Math.abs(quantity) === 1) return trimmedMetric;

  const pluralMetric = pluralQuantityMetrics[trimmedMetric.toLowerCase()];

  return pluralMetric
    ? matchMetricCasing(trimmedMetric, pluralMetric)
    : `${trimmedMetric}s`;
};
