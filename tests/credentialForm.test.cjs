/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const React = require("react");
const jsx = require("react/jsx-runtime");
const { renderToStaticMarkup } = require("react-dom/server");
const load = require("./helpers/loadSource.cjs");
const helpers = load("src/features/settings/helpers/credentialForm.ts");
const cert = { id: "private-id", _id: "private-id", issuingOrganisation: "Institute", verificationNumber: "CERT-123", issuingDate: "2024-11-01T00:00:00.000Z", expiringDate: "2028-11-30T00:00:00.000Z", isCertificateExpire: false, certificate: "https://res.cloudinary.com/example/certificate.png" };
const membership = { id: "member-id", _id: "member-id", organisation: "Association", positionHeld: "President", startDate: "2026-01-01T00:00:00.000Z", endDate: "2026-11-30T00:00:00.000Z", isMembershipExpire: false };
const draft = helpers.credentialFormDraft({ certifications: [cert], memberships: [membership], insurances: [] });

test("credential draft converts API timestamps to valid date input values and retains record identities internally", () => {
  assert.equal(draft.certifications[0].issuingDate, "2024-11-01");
  assert.equal(draft.certifications[0].expiringDate, "2028-11-30");
  assert.equal(draft.memberships[0].startDate, "2026-01-01");
  assert.equal(draft.memberships[0].endDate, "2026-11-30");
  assert.equal(draft.certifications[0]._id, cert._id);
  assert.equal(helpers.credentialDateInput("invalid"), "");
  assert.equal(cert.issuingDate, "2024-11-01T00:00:00.000Z");
});

const fields = load("src/features/settings/components/ManageExpertCredentialsModal/CredentialFields.tsx", {
  "react/jsx-runtime": jsx,
  "next/image": { default: ({ src, alt }) => React.createElement("img", { src, alt }) },
  "@/components/molecules/InputWrapper/InputWrapper": { default: ({ title, name, type, value }) => React.createElement("label", null, title, React.createElement("input", { name, type, value, readOnly: true })) },
  "@/components/molecules/SelectWrapper/SelectWrapper": { default: ({ title, name, value, options }) => React.createElement("label", null, title, React.createElement("select", { name, value, readOnly: true }, options.map((item) => React.createElement("option", { key: item.value, value: item.value }, item.label)))) },
  "@/components/atoms/Label/Label": { default: ({ title }) => React.createElement("label", null, title) },
  "@/components/atoms/Input/Input": { default: (props) => React.createElement("input", props) },
  "@/components/atoms/TextArea/Textarea/Textarea": { default: (props) => React.createElement("textarea", props) },
  "@/features/experts/constants": { insuranceCoverageTypes: [{ label: "Professional Indemnity Insurance", value: "Professional Indemnity Insurance" }] },
  "../../helpers/credentialForm": helpers,
}).default;
const render = (tab, item) => renderToStaticMarkup(React.createElement(fields, { tab, item, index: 0, onChange() {} }));

test("certificate editor shows its organisation, dates, image and no-expiry checkbox without metadata inputs", () => {
  const html = render("certifications", draft.certifications[0]);
  for (const text of ["Issuing organisation", "Institute", "Issued date", "2024-11-01", "2028-11-30", "This certificate doesn’t expire"]) assert.ok(html.includes(text));
  assert.ok(html.includes('alt="Certificate from Institute"'));
  assert.ok(!html.includes('type="text" value="https:'));
  assert.ok(!html.includes("private-id"));
  const indefinite = render("certifications", { ...draft.certifications[0], isCertificateExpire: true });
  assert.match(indefinite, /type="date" disabled=""/);
  assert.match(indefinite, /type="checkbox"[^>]*checked=""/);
});

test("membership dates and doesn't-end control render correctly; insurance uses select and larger textarea", () => {
  const html = render("memberships", draft.memberships[0]);
  for (const text of ["2026-01-01", "2026-11-30", "This membership doesn’t end"]) assert.ok(html.includes(text));
  assert.ok(!html.includes("member-id"));
  const insurance = render("insurances", { id: "hidden-insurance", _id: "hidden-insurance", issuingOrganisation: "Insurer", coverage: "Professional Indemnity Insurance", description: "Health and damages" });
  assert.ok(insurance.includes("Issuing organisation"));
  assert.ok(insurance.includes("<select"));
  assert.ok(insurance.includes('rows="5"'));
  assert.ok(!insurance.includes("hidden-insurance"));
  assert.equal(helpers.credentialDocumentUrl("javascript:alert(1)"), undefined);
});
