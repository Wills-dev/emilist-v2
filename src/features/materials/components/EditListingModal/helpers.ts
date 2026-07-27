import { quantityMetrics } from "@/lib/constants/qunatityUnits";
import { countriesAndStates } from "@/lib/constants/countries";
import { formatInputTextNumberWithCommas } from "@/lib/helpers/formatNumbers";
import { OtherSellerProduct } from "../../types";
import { EditListingFormValues } from "./types";

export const getMetricValue = (metric: string) =>
  quantityMetrics.find(
    ({ value }) => value.toLowerCase() === metric.toLowerCase(),
  )?.value ?? metric;

export const getInitialEditListingValues = (
  material: OtherSellerProduct,
): EditListingFormValues => {
  const location = material.deliveryLocations[0];
  const selectedCountry = countriesAndStates.find(
    ({ value }) => value === location?.state,
  );
  const countryForLegacyState = countriesAndStates.find(({ states }) =>
    states.includes(location?.state ?? ""),
  );

  return {
    name: material.name,
    brand: material.brand,
    description: material.description,
    availableQuantity: String(material.availableQuantity),
    quantityMetric: getMetricValue(material.quantityMetric),
    price: formatInputTextNumberWithCommas(String(material.price)),
    currency: material.currency,
    priceMetric: getMetricValue(material.priceMetric),
    state: selectedCountry?.value ?? countryForLegacyState?.value ?? "",
    lga: selectedCountry ? (location?.lga ?? "") : (location?.state ?? ""),
    merchantName: material.merchantName,
  };
};
