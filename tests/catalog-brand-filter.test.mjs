import { test } from "node:test";
import assert from "node:assert/strict";
import { CATALOG_SORT_VALUES, categoryUrlWithFilters, getCatalogSortLabel, normalizeCatalogBrands, updateCatalogFilters } from "../src/utils/catalogFilters.js";

test("selecting a brand preserves bestseller sorting, category and search", () => {
  const current = new URLSearchParams("sort=bestseller&category=Whey+Protein&search=chocolate&page=4");
  const next = updateCatalogFilters(current, { brand: "Gomzi Nutrition" });
  assert.equal(next.get("sort"), "bestseller");
  assert.equal(next.get("category"), "Whey Protein");
  assert.equal(next.get("search"), "chocolate");
  assert.equal(next.get("brand"), "Gomzi Nutrition");
  assert.equal(next.has("page"), false);
  assert.equal(current.has("brand"), false);
});
test("clearing a brand removes legacy company filters and keeps sort", () => {
  const next = updateCatalogFilters(new URLSearchParams("sort=bestseller&company=Gomzi&brand=Gomzi"), { brand: "" });
  assert.equal(next.toString(), "sort=bestseller");
});
test("sort changes and category changes retain the selected brand", () => {
  const current = new URLSearchParams("sort=bestseller&brand=Gomzi+Nutrition");
  const next = updateCatalogFilters(current, { sort: CATALOG_SORT_VALUES["Price, low to high"] });
  assert.equal(next.get("brand"), "Gomzi Nutrition");
  assert.equal(getCatalogSortLabel(next.get("sort")), "Price, low to high");
  const url = new URL(categoryUrlWithFilters("/gomzi-supplement?category=Creatine", current), "https://storefront.example");
  assert.equal(url.searchParams.get("brand"), "Gomzi Nutrition");
  assert.equal(url.searchParams.get("category"), "Creatine");
  assert.equal(url.searchParams.get("sort"), "bestseller");
});
test("brand options come from active companies without duplicates", () => {
  assert.deepEqual(normalizeCatalogBrands([{ name: "Gomzi Nutrition" }, { name: "gomzi nutrition" }, { name: " QNT " }, { name: "Hidden", status: false }, {}, null]), ["Gomzi Nutrition", "QNT"]);
});
