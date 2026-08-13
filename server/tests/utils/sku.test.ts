import generateSKU from "../../src/utils/generateSKU";

describe("generateSKU", () => {
  it("should generate a SKU with a 3-character uppercase prefix", () => {
    const sku = generateSKU("iphone");

    expect(sku).toBe("IPH-001");
  });

  it("should generate sequential SKUs", () => {
    const sku1 = generateSKU("iphone");
    const sku2 = generateSKU("iphone");

    expect(sku1).toBe("IPH-002");
    expect(sku2).toBe("IPH-003");
  });

  it("should remove spaces, uppercase, and limit the product name to 3 characters", () => {
    const sku = generateSKU("Samsung Galaxy");

    expect(sku).toBe("SAM-004");
  });

  it("should trim leading and trailing whitespace", () => {
    const sku = generateSKU("  iphone  ");

    expect(sku).toBe("IPH-005");
  });

  it("should pad the sequence number with zeros", () => {
    const sku = generateSKU("MacBook");

    expect(sku).toMatch(/^MAC-\d{3}$/);
  });
});
