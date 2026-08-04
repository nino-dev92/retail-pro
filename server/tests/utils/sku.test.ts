import generateSKU from "../../src/utils/generateSKU";

describe("generateSKU", () => {
  it("should generate a SKU", () => {
    const sku = generateSKU("iphone");

    expect(sku).toContain("IPHONE-");
  });

  it("should generate different SKUs", () => {
    const sku1 = generateSKU("iphone");
    const sku2 = generateSKU("iphone");

    expect(sku1).not.toBe(sku2);
  });

  it("should always uppercase the product name", () => {
    const sku = generateSKU("Samsung Galaxy");

    expect(sku.startsWith("SAMSUNG GALAXY-")).toBe(true);
  });
});
