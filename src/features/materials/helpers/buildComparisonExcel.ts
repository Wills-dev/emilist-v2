import { ComparedProduct } from "../types";

const escapeXml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const cell = (value: unknown, type: "String" | "Number" = "String") =>
  `<Cell><Data ss:Type="${type}">${escapeXml(value)}</Data></Cell>`;

export const buildComparisonExcel = (products: ComparedProduct[]) => {
  const headers = [
    "Product",
    "Brand",
    "Category",
    "Merchant",
    "Price",
    "Currency",
    "Price Unit",
    "Available Quantity",
    "Quantity Unit",
    "Location",
    "Average Rating",
    "Reviews",
    "Description",
  ];

  const rows = products.map((product) => {
    const location = product.deliveryLocations
      .map(({ lga, state }) => [lga, state].filter(Boolean).join(", "))
      .join("; ");

    return [
      cell(product.name),
      cell(product.brand),
      cell(product.subCategory || product.category),
      cell(product.merchantName),
      cell(product.discountedPrice ?? product.price, "Number"),
      cell(product.currency),
      cell(product.priceMetric),
      cell(product.availableQuantity, "Number"),
      cell(product.quantityMetric),
      cell(location),
      cell(product.averageRating, "Number"),
      cell(product.totalReviews, "Number"),
      cell(product.description),
    ].join("");
  });

  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="Material Comparison">
  <Table>
   <Row>${headers.map((header) => cell(header)).join("")}</Row>
   ${rows.map((row) => `<Row>${row}</Row>`).join("")}
  </Table>
 </Worksheet>
</Workbook>`;
};
