import { mapProductDTO } from "../../src/utils/mapProductDTO";

describe("mapProductDTO", () => {
  it("should map product correctly", () => {
    const product: any = {
      _id: "123",
      name: "Laptop",
      description: "Gaming Laptop",
      price: 3000,
      sku: "LAPTOP-123",
      isActive: true,
      quantity: 10,
      createdBy: "user",
      category: "cat",
    };

    const dto = mapProductDTO(product);

    expect(dto).toEqual({
      id: "123",
      name: "Laptop",
      description: "Gaming Laptop",
      price: 3000,
      sku: "LAPTOP-123",
      isActive: true,
    });
  });

  it("should not expose internal fields", () => {
    const product: any = {
      _id: "123",
      quantity: 50,
      costPrice: 100,
      supplier: "supplier",
      createdBy: "user",
      category: "cat",
      name: "Laptop",
      description: "Gaming Laptop",
      price: 3000,
      sku: "SKU",
      isActive: true,
    };

    const dto = mapProductDTO(product);

    expect(dto).not.toHaveProperty("createdBy");
    expect(dto).not.toHaveProperty("costPrice");
    expect(dto).not.toHaveProperty("quantity");
    expect(dto).not.toHaveProperty("supplier");
  });
});
