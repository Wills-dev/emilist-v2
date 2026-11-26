/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const load = require("./helpers/loadSource.cjs");
const messages = [];
const common = load("src/lib/helpers/formValidation.ts", { sonner: { toast: { error: (message) => messages.push(message) } } });
const material = load("src/features/materials/helpers/validateMaterialForm.ts", { "@/lib/helpers/formValidation": common });
const profile = load("src/features/auth/helpers/validateProfileForm.ts", { "@/lib/helpers/formValidation": common });
const business = load("src/features/experts/helpers/validateBusinessProfile.ts", { "@/lib/helpers/formValidation": common });

test("material submission reports one error at a time in field order, including empty rich text and invalid numbers", () => {
  const form = { name: "", category: "", brand: "", description: "<p></p>", availableQuantity: 0, quantityMetric: "", currency: "", price: 0, priceMetric: "", images: [], deliveryLocations: [], merchantName: "" };
  for (const [field, value] of [["name","Cement"],["category","Building"],["brand","Brand"],["description","<p>Cement bags</p>"],["availableQuantity",2],["quantityMetric","Bag"],["currency","NGN"],["price",50],["priceMetric","Bag"],["image",[{}]],["state","Nigeria"],["lga","Lagos"],["merchantName","Merchant"]]) {
    assert.equal(material.getMaterialFormError(form).field, field);
    messages.length = 0;
    assert.equal(material.validateMaterialForm(form), false);
    assert.equal(messages.length, 1);
    if (field === "image") form.images = value;
    else if (field === "state") form.deliveryLocations = [{ state: value, lga: "" }];
    else if (field === "lga") form.deliveryLocations[0].lga = value;
    else form[field] = value;
  }
  assert.equal(material.validateMaterialForm(form), true);
  assert.equal(material.getMaterialFormError({ ...form, price: NaN }).field, "price");
  assert.equal(material.getMaterialFormError({ ...form, description: "<p>&nbsp;</p>" }).field, "description");
});

test("expert profile and business validation choose the first visible missing field", () => {
  const person = { firstName: "", lastName: "", countryCode: "", mobile: "", languages: [], country: "", state: "", city: "", houseAddress: "", bio: "" };
  assert.equal(profile.getProfileFormError(person).field, "firstName");
  const company = { businessName: "", yearFounded: "", numberOfEmployee: "", businessCountry: "", businessState: "", businessAddress: "", services: [], coverageArea: [], currency: "", startingPrice: "", rateUnit: "", noticePeriod: "", businessDescription: "" };
  for (const [field, value] of [["businessName","Business"],["yearFounded","2020"],["numberOfEmployee","2"],["businessCountry","Nigeria"],["businessState","Lagos"],["businessAddress","Address"],["services",["Plumber"]],["coverageArea",["Lagos"]],["currency","NGN"],["startingPrice","5000"],["rateUnit","Day"],["noticePeriod","1"],["businessDescription","<p>Business</p>"]]) {
    assert.equal(business.getBusinessProfileError(company, []).field, field);
    company[field] = value;
  }
  assert.equal(business.getBusinessProfileError(company, []).field, "businessImages");
  assert.equal(business.getBusinessProfileError(company, [{}]), undefined);
});

test("focus waits for the missing step to mount, scrolls to the control and focuses it", () => {
  const original = { document: global.document, window: global.window, MutationObserver: global.MutationObserver };
  const events = [];
  let mounted = false;
  let onMutation;
  const target = { style: {}, matches: (selector) => !['input[type="hidden"]', 'input[type="file"], input[type="radio"]'].includes(selector), scrollIntoView: (options) => events.push(["scroll", options]), focus: (options) => events.push(["focus", options]) };
  try {
    global.document = { body: {}, querySelector: () => mounted ? target : null };
    global.window = { requestAnimationFrame: (fn) => fn(), setTimeout() {}, matchMedia: () => ({ matches: true }) };
    global.MutationObserver = class { constructor(fn) { onMutation = fn; } observe() {} disconnect() { events.push(["disconnect"]); } };
    common.focusValidationTarget("#missing");
    assert.deepEqual(events, []);
    mounted = true;
    onMutation();
    assert.deepEqual(events, [["scroll", { behavior: "auto", block: "center" }], ["focus", { preventScroll: true }], ["disconnect"]]);
  } finally {
    for (const [key, value] of Object.entries(original)) {
      if (value === undefined) delete global[key]; else global[key] = value;
    }
  }
});

test("job errors use visual field and milestone order", () => {
  const job = load("src/features/jobs/helpers/firstJobFormError.ts");
  assert.equal(job.firstJobDetailsError({ errors: { budget: "Budget", jobDuration: "Duration", title: "Title" } }).message, "Title");
  assert.equal(job.firstJobDetailsError({ errors: { budget: "Budget", jobDuration: "Duration" } }).message, "Duration");
  const draft = { milestones: [{ id: "first" }, { id: "second" }] };
  assert.deepEqual(job.firstJobMilestoneError(draft, { errors: { second: { achievement: "Second" }, first: { achievement: "Achievement", timeFrame: "Duration" } } }), { selector: '[id="first-duration"]', message: "Duration" });
});

test("optional expertise entries retain their original row index when locating incomplete fields", () => {
  const mock = { sonner: { toast: { error() {} } } };
  const cert = load("src/features/experts/helpers/validateCertifications.ts", mock);
  const mem = load("src/features/experts/helpers/validateMemberships.ts", mock);
  const ins = load("src/features/experts/helpers/validateInsurances.ts", mock);
  const { getExperienceError } = load("src/features/experts/helpers/expertExperienceValidation.ts", { "./validateCertifications": cert, "./validateMemberships": mem, "./validateInsurances": ins });
  const empty = { issuingOrganisation: "", verificationNumber: "", issuingDate: "", expiringDate: "", isCertificateExpire: false };
  assert.equal(getExperienceError([empty], [], []), undefined);
  const error = getExperienceError([empty, { ...empty, issuingOrganisation: "Institute" }], [], []);
  assert.equal(error.index, 1);
  assert.equal(error.field, "certificate-1-verificationNumber");
});
