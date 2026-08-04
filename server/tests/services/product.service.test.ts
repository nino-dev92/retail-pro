import { Types } from "mongoose";

import Category from "../../src/models/Category";
import Product from "../../src/models/Product";
import User from "../../src/models/User";

import * as productService from "../../src/services/product.service";

describe("Product Service", () => {
  describe("addProduct", () => {
    let user: any;
    let category: any;

    beforeEach(async () => {
      user = await User.create({
        firstName: "Richard",
        lastName: "Nneji",
        email: "richard@test.com",
        password: "password123",
        role: "admin",
        isVerified: true,
      });

      category = await Category.create({
        name: "Electronics",
        description: "Electrical products",
      });
    });

    it("should create a product successfully", async () => {
      const product = await productService.addProduct({
        name: "Laptop",
        description: "Gaming laptop",
        price: 1000,
        costPrice: 800,
        quantity: 20,
        supplier: user._id.toString(),
        sku: "LP001",
        category: category._id.toString(),
        createdBy: user._id.toString(),
      });

      expect(product.name).toBe("Laptop");

      const dbProduct = await Product.findById(product.id);

      expect(dbProduct).not.toBeNull();
      expect(dbProduct?.price).toBe(1000);
    });

    it("should throw if category does not exist", async () => {
      const fakeCategory = new Types.ObjectId().toString();

      await expect(
        productService.addProduct({
          name: "Laptop",
          description: "Gaming laptop",
          price: 1000,
          costPrice: 800,
          quantity: 20,
          supplier: user._id.toString(),
          sku: "LP001",
          category: fakeCategory,
          createdBy: user._id.toString(),
        }),
      ).rejects.toThrow("Category not found");
    });

    it("should throw if user does not exist", async () => {
      const fakeUser = new Types.ObjectId().toString();

      await expect(
        productService.addProduct({
          name: "Laptop",
          description: "Gaming laptop",
          price: 1000,
          costPrice: 800,
          quantity: 20,
          supplier: fakeUser,
          sku: "LP001",
          category: category._id.toString(),
          createdBy: fakeUser,
        }),
      ).rejects.toThrow("User not found");
    });

    it("should throw if category id is invalid", async () => {
      await expect(
        productService.addProduct({
          name: "Laptop",
          description: "Gaming laptop",
          price: 1000,
          costPrice: 800,
          quantity: 20,
          supplier: user._id.toString(),
          sku: "LP001",
          category: "abcd",
          createdBy: user._id.toString(),
        }),
      ).rejects.toThrow("Invalid product details");
    });

    it("should throw if createdBy is missing", async () => {
      await expect(
        productService.addProduct({
          name: "Laptop",
          description: "Gaming laptop",
          price: 1000,
          costPrice: 800,
          quantity: 20,
          supplier: user._id.toString(),
          sku: "LP001",
          category: category._id.toString(),
          createdBy: "",
        }),
      ).rejects.toThrow("Incomplete product details");
    });

    it("should throw if category is missing", async () => {
      await expect(
        productService.addProduct({
          name: "Laptop",
          description: "Gaming laptop",
          price: 1000,
          costPrice: 800,
          quantity: 20,
          supplier: user._id.toString(),
          sku: "LP001",
          category: "",
          createdBy: user._id.toString(),
        }),
      ).rejects.toThrow("Incomplete product details");
    });
  });

  describe("findAllProducts", () => {
    let user: any;
    let electronics: any;
    let furniture: any;

    beforeEach(async () => {
      user = await User.create({
        firstName: "Richard",
        lastName: "Nneji",
        email: "richard@test.com",
        password: "password123",
        role: "admin",
        isVerified: true,
      });

      electronics = await Category.create({
        name: "Electronics",
        description: "Electronic products",
      });

      furniture = await Category.create({
        name: "Furniture",
        description: "Wooden products",
      });

      // 15 Electronics products
      for (let i = 1; i <= 15; i++) {
        await productService.addProduct({
          name: `Laptop ${i}`,
          description: `Gaming Laptop ${i}`,
          price: 1000,
          costPrice: 800,
          quantity: 10,
          supplier: user._id.toString(),
          sku: `LP${i}`,
          category: electronics._id.toString(),
          createdBy: user._id.toString(),
        });
      }

      // 5 Furniture products
      for (let i = 1; i <= 5; i++) {
        await productService.addProduct({
          name: `Chair ${i}`,
          description: `Wooden Chair ${i}`,
          price: 500,
          costPrice: 300,
          quantity: 8,
          supplier: user._id.toString(),
          sku: `CH${i}`,
          category: furniture._id.toString(),
          createdBy: user._id.toString(),
        });
      }
    });

    it("should return the first page", async () => {
      const result = await productService.findAllProducts(
        1,
        10,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      expect(result.productDTO).toHaveLength(10);
      expect(result.totalProducts).toBe(20);
    });

    it("should return the second page", async () => {
      const result = await productService.findAllProducts(
        2,
        10,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      expect(result.productDTO).toHaveLength(10);
    });

    it("should return the last page", async () => {
      const result = await productService.findAllProducts(
        3,
        10,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      expect(result.productDTO).toHaveLength(0);
    });

    it("should search products by name", async () => {
      const result = await productService.findAllProducts(
        1,
        20,
        "Laptop",
        undefined,
        undefined,
        undefined,
      );

      expect(result.productDTO).toHaveLength(15);

      result.productDTO.forEach((product) => {
        expect(product.name).toContain("Laptop");
      });
    });

    it("should filter by category", async () => {
      const result = await productService.findAllProducts(
        1,
        20,
        undefined,
        furniture._id.toString(),
        undefined,
        undefined,
      );

      expect(result.productDTO).toHaveLength(5);
    });

    it("should filter by minimum price", async () => {
      const result = await productService.findAllProducts(
        1,
        20,
        undefined,
        undefined,
        900,
        undefined,
      );

      expect(result.productDTO).toHaveLength(15);
    });

    it("should filter by maximum price", async () => {
      const result = await productService.findAllProducts(
        1,
        20,
        undefined,
        undefined,
        undefined,
        600,
      );

      expect(result.productDTO).toHaveLength(5);
    });

    it("should filter between minimum and maximum price", async () => {
      const result = await productService.findAllProducts(
        1,
        20,
        undefined,
        undefined,
        400,
        600,
      );

      expect(result.productDTO).toHaveLength(5);
    });

    it("should throw when category id is invalid", async () => {
      await expect(
        productService.findAllProducts(
          1,
          20,
          undefined,
          "abcd",
          undefined,
          undefined,
        ),
      ).rejects.toThrow("Invalid category");
    });
  });

  describe("findProductById", () => {
    let user: any;
    let category: any;
    let product: any;

    beforeEach(async () => {
      user = await User.create({
        firstName: "Richard",
        lastName: "Nneji",
        email: "richard@test.com",
        password: "password123",
        role: "admin",
        isVerified: true,
      });

      category = await Category.create({
        name: "Books",
        description: "Books category",
      });

      product = await productService.addProduct({
        name: "Atomic Habits",
        description: "A self-help book",
        price: 2500,
        costPrice: 1800,
        quantity: 10,
        supplier: user._id.toString(),
        sku: "BOOK001",
        category: category._id.toString(),
        createdBy: user._id.toString(),
      });
    });

    it("should return a product by id", async () => {
      const found = await productService.findProductById(product.id);

      expect(found).not.toBeNull();
      expect(found.id.toString()).toBe(product.id.toString());
      expect(found.name).toBe("Atomic Habits");
    });

    it("should throw if product does not exist", async () => {
      await expect(
        productService.findProductById(new Types.ObjectId().toString()),
      ).rejects.toThrow("Product not found");
    });

    it("should throw if id is invalid", async () => {
      await expect(productService.findProductById("abcd")).rejects.toThrow(
        "Invalid product details",
      );
    });
  });

  describe("updateProduct", () => {
    let user: any;
    let category: any;
    let product: any;

    beforeEach(async () => {
      user = await User.create({
        firstName: "Richard",
        lastName: "Nneji",
        email: "richard@test.com",
        password: "password123",
        role: "admin",
        isVerified: true,
      });

      category = await Category.create({
        name: "Electronics",
        description: "Electronic products",
      });

      product = await Product.create({
        name: "Phone",
        description: "Android Phone",
        price: 500,
        costPrice: 300,
        quantity: 5,
        sku: "PH001",
        supplier: new Types.ObjectId().toString(),
        category: category._id,
        createdBy: user._id,
      });
    });

    it("should update a product", async () => {
      const updated = await productService.updateProduct(
        product._id.toString(),
        {
          name: "iPhone 16",
          price: 1200,
        },
      );

      expect(updated.name).toBe("iPhone 16");

      const dbProduct = await Product.findById(product._id);

      expect(dbProduct?.name).toBe("iPhone 16");
      expect(dbProduct?.price).toBe(1200);
    });

    it("should update multiple fields", async () => {
      const updated = await productService.updateProduct(
        product._id.toString(),
        {
          name: "Samsung Galaxy",
          quantity: 20,
          price: 900,
        },
      );

      expect(updated.name).toBe("Samsung Galaxy");

      const dbProduct = await Product.findById(product._id);

      expect(dbProduct?.quantity).toBe(20);
      expect(dbProduct?.price).toBe(900);
    });

    it("should throw if product does not exist", async () => {
      await expect(
        productService.updateProduct(new Types.ObjectId().toString(), {
          name: "Phone",
        }),
      ).rejects.toThrow("Product not found");
    });

    it("should throw if id is invalid", async () => {
      await expect(
        productService.updateProduct("abcd", {
          name: "Phone",
        }),
      ).rejects.toThrow("Invalid product details");
    });

    it("should not modify other fields", async () => {
      await productService.updateProduct(product._id.toString(), {
        name: "Pixel 10",
      });

      const dbProduct = await Product.findById(product._id);

      expect(dbProduct?.name).toBe("Pixel 10");
      expect(dbProduct?.price).toBe(500);
      expect(dbProduct?.quantity).toBe(5);
      expect(dbProduct?.description).toBe("Android Phone");
    });
  });

  describe("softDeleteProduct", () => {
    let user: any;
    let category: any;
    let product: any;

    beforeEach(async () => {
      user = await User.create({
        firstName: "Richard",
        lastName: "Nneji",
        email: "richard@test.com",
        password: "password123",
        role: "admin",
        isVerified: true,
      });

      category = await Category.create({
        name: "Electronics",
        description: "Electronic products",
      });

      product = await Product.create({
        name: "Phone",
        description: "Android Phone",
        price: 500,
        costPrice: 300,
        quantity: 5,
        sku: "PH001",
        supplier: new Types.ObjectId().toString(),
        category: category._id,
        createdBy: user._id,
      });
    });

    it("Should change product IsActive to false", async () => {
      const updateProduct: any = await productService.softDeleteProduct(
        product._id.toString(),
      );

      expect(updateProduct).not.toBe(null);
      expect(updateProduct?.isActive).toBe(false);
    });

    it("Should throw an error if product is not found", async () => {
      await expect(
        productService.softDeleteProduct(new Types.ObjectId().toString()),
      ).rejects.toThrow("Product not found");
    });

    it("Should throw an error if productId is invalid", async () => {
      await expect(productService.softDeleteProduct("abc")).rejects.toThrow(
        "Invalid product details",
      );
    });
  });
});
