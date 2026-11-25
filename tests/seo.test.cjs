/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const load = require("./helpers/loadSource.cjs");
const site = load("src/lib/seo/site.ts");
const configuredSite = { ...site, SITE_URL: "https://emilist-v2.vercel.app", PREVIEW_DEPLOYMENT: false, DEFAULT_SHARE_IMAGE: { ...site.DEFAULT_SHARE_IMAGE, url: "https://emilist-v2.vercel.app/og-image.png" } };
const metadata = load("src/lib/seo/metadata.ts", { "./site": configuredSite });
const visibility = load("src/lib/seo/resourceVisibility.ts");
const data = load("src/lib/seo/publicData.ts", { "server-only": {} });

test("canonical origin and sharing images use the deployment domain with actual image dimensions", () => {
  assert.equal(site.resolveSiteUrl(undefined, undefined), "https://emilist-v2.vercel.app");
  assert.equal(site.resolveSiteUrl("https://emilist.com/some/path"), "https://emilist.com");
  assert.equal(site.resolveSiteUrl(undefined, "emilist-v2.vercel.app"), "https://emilist-v2.vercel.app");
  assert.throws(() => site.resolveSiteUrl("ftp://example.com"));
  assert.equal(site.resolveShareOrigin("http://localhost:3000"), "https://emilist-v2.vercel.app");
  assert.equal(site.resolveShareOrigin("https://emilist.com"), "https://emilist.com");
  assert.equal(site.resolveShareOrigin("http://localhost:3000", "https://emilist.com"), "https://emilist.com");
  const png = fs.readFileSync(path.resolve(__dirname, "../public/og-image.png"));
  assert.equal(site.DEFAULT_SHARE_IMAGE.width, png.readUInt32BE(16));
  assert.equal(site.DEFAULT_SHARE_IMAGE.height, png.readUInt32BE(20));
  const page = metadata.createPageMetadata({ title: "Find Jobs", path: "/marketplace/jobs" });
  assert.equal(page.title.absolute, "Find Jobs | Emilist");
  assert.equal(page.alternates.canonical, "https://emilist-v2.vercel.app/marketplace/jobs");
  assert.equal(page.openGraph.images[0].url, "https://emilist-v2.vercel.app/og-image.png");
  assert.equal(page.twitter.images[0].url, page.openGraph.images[0].url);
  assert.equal(page.robots.index, true);
});

test("private pages and preview deployments are not indexable", () => {
  const page = metadata.createPageMetadata({ title: "Support Ticket", index: false, path: "/dashboard/support/private-id" });
  assert.equal(page.robots.index, false);
  assert.equal(page.robots.googleBot.index, false);
  assert.equal(page.alternates.canonical, null);
  assert.equal(page.openGraph.url, undefined);
  const previews = load("src/lib/seo/metadata.ts", { "./site": { ...configuredSite, PREVIEW_DEPLOYMENT: true } });
  assert.equal(previews.createPageMetadata({ path: "/" }).robots.index, false);
  assert.equal(metadata.plainDescription("<p>Hello&nbsp; &amp; welcome</p>"), "Hello & welcome");
  assert.ok(metadata.plainDescription("a".repeat(300)).length <= 160);
});

test("resource metadata uses public data and hides unpublished records", async () => {
  const records = {
    "/jobs/fetch-job-by-id": { job: { _id: "job", status: "listed", title: "Build a table", description: "<p>Make a wooden table.</p>" } },
    "/material/fetch-product/product": { product: { _id: "product", status: "active", name: "Cement", description: "Quality cement", images: [{ imageUrl: "https://res.cloudinary.com/example.png" }] } },
    "/business/fetch-single-business/expert": { business: { _id: "expert", businessName: "Cole Furniture", businessDescription: "Furniture maker" } },
  };
  const resource = load("src/lib/seo/resourceMetadata.ts", { "server-only": {}, "./metadata": metadata, "./resourceVisibility": visibility,
    "./publicData": { ...data, fetchPublicData: async (endpoint) => records[endpoint] ?? null },
  });
  assert.equal((await resource.jobMetadata("job")).title.absolute, "Build a table | Emilist");
  const material = await resource.materialMetadata("product");
  assert.equal(material.openGraph.images[0].url, "https://res.cloudinary.com/example.png");
  assert.equal((await resource.expertMetadata("expert")).title.absolute, "Cole Furniture | Emilist");
  assert.equal((await resource.profileMetadata("artisan", "expert")).alternates.canonical, "https://emilist-v2.vercel.app/marketplace/experts/expert");
  assert.equal((await resource.profileMetadata("merchant", "user")).robots.index, false);
  records["/material/fetch-product/product"].product.status = "inactive";
  const inactive = await resource.materialMetadata("product");
  assert.equal(inactive.robots.index, false);
  assert.equal(inactive.title.absolute, "Material Details | Emilist");
  assert.equal((await resource.jobMetadata("missing")).robots.index, false);
});

test("public metadata fetches omit authentication and reject unsafe image sources", async () => {
  const previousFetch = global.fetch;
  const previousApi = process.env.NEXT_PUBLIC_API_URL;
  process.env.NEXT_PUBLIC_API_URL = "https://api.example/api/v1";
  global.fetch = async (url, options) => {
    assert.equal(String(url), "https://api.example/api/v1/jobs/fetch-job-by-id?id=abc");
    assert.equal(options.credentials, "omit");
    assert.deepEqual(options.headers, { Accept: "application/json" });
    return { ok: true, json: async () => ({ data: { title: "Public job" } }) };
  };
  try { assert.deepEqual(await data.fetchPublicData("/jobs/fetch-job-by-id", { id: "abc" }), { title: "Public job" }); }
  finally { global.fetch = previousFetch; if (previousApi === undefined) delete process.env.NEXT_PUBLIC_API_URL; else process.env.NEXT_PUBLIC_API_URL = previousApi; }
  assert.equal(data.publicImage("javascript:alert(1)"), undefined);
  assert.equal(data.publicImage("data:image/png;base64,example"), undefined);
  assert.equal(data.publicImage([{ imageUrl: "https://cdn.example/material.png" }]), "https://cdn.example/material.png");
});

test("sitemap only contains eligible public resources and follows API pagination", () => {
  const sitemap = load("src/lib/seo/sitemapData.ts", { "server-only": {}, "./publicData": data, "./resourceVisibility": visibility, "./site": configuredSite });
  const page = sitemap.sitemapPage("jobs", { jobs: [{ _id: "visible", status: "listed" }, { _id: "draft", status: "draft" }, { _id: "gone", status: "listed", isDeleted: true }], totalPages: 2 }, 1);
  assert.deepEqual(page.entries.map((item) => item.url), ["https://emilist-v2.vercel.app/marketplace/jobs/visible"]);
  assert.equal(page.next, true);
  assert.equal(sitemap.sitemapPage("materials", { products: [{ _id: "inactive", status: "inactive" }], totalPages: 1 }, 1).entries.length, 0);
  assert.ok(sitemap.PUBLIC_SITEMAP_PATHS.every((item) => !item.startsWith("/dashboard") && !item.startsWith("/auth")));
});

test("all application pages export server metadata; public images exist", () => {
  function inspect(dir) {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const filename = path.join(dir, item.name);
      if (item.isDirectory()) inspect(filename);
      else if (item.name === "page.tsx") {
        const source = fs.readFileSync(filename, "utf8");
        assert.match(source, /export (?:const metadata|async function generateMetadata)/, filename);
        assert.doesNotMatch(source, /^["']use client["']/, filename);
      }
    }
  }
  inspect(path.resolve(__dirname, "../src/app"));
});
