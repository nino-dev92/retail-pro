import request from "supertest";
import app from "../../src/app";

import User from "../../src/models/User";
import Category from "../../src/models/Category";
import Product from "../../src/models/Product";
import { Types } from "mongoose";

jest.mock("../../src/middleware/verifyJWT.middleware", () => {
  return (req: any, res: any, next: any) => {
    req.user = {
      userId: "507f1f77bcf86cd799439011",
      role: "admin",
    };

    next();
  };
});

jest.mock("../../src/middleware/authorizeRole.middleware", () => {
  return () => (req: any, res: any, next: any) => next();
});

describe("Product Controller", () => {
  let category: any;
  let user: any;

  beforeEach(async () => {
    // Create the SAME user used in the mocked JWT
    user = await User.create({
      _id: new Types.ObjectId("507f1f77bcf86cd799439011"),
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
  });

  describe("POST /api/products", () => {
    it("should create a product successfully", async () => {
      const response = await request(app).post("/api/products").send({
        name: "Laptop",
        description: "Gaming laptop",
        price: 1000,
        costPrice: 800,
        quantity: 10,
        supplier: new Types.ObjectId().toString(),
        category: category._id.toString(),
      });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Product created successfully");
      expect(response.body.data.name).toBe("Laptop");
      expect(response.body.data.price).toBe(1000);

      // Verify it was actually saved
      const dbProduct = await Product.findOne({
        name: "Laptop",
      });

      expect(dbProduct).not.toBeNull();
    });
  });
});
