import request from "supertest";
import app from "../../src/app";
import { Types } from "mongoose";
import Category from "../../src/models/Category";
import Supplier from "../../src/models/Supplier";
import { getAuthenticatedUser } from "../helpers/auth";
import { ROLES } from "../../src/constants/roles";
import Product from "../../src/models/Product";

const userId = new Types.ObjectId();
describe("Product routes", () => {
  let auth: any;
  let supplier: any;
  let category: any;
  beforeEach(async () => {
    // getAccessToken
    auth = await getAuthenticatedUser(ROLES.ADMIN);

    category = await Category.create({
      name: "Electronics",
      description: "Electronic products",
    });

    supplier = await Supplier.create({
      name: "ABC Supplier",
      phone: "08012345678",
      email: "test@test.com",
      contactPerson: "test",
      address: "Lagos",
    });
  });

  describe("GET /api/products", () => {
    it("Should get all products", async () => {
      for (let i = 1; i <= 5; i++) {
        await request(app)
          .post("/api/products")
          .send({
            name: `product${i}`,
            description: `description${i}`,
            price: 500,
            costPrice: 200,
            quantity: 5,
            supplier: supplier._id.toString(),
            category: category._id.toString(),
          })
          .set("Authorization", `Bearer ${auth.token}`);
      }

      const response = await request(app)
        .get("/api/products")
        .set("Authorization", `Bearer ${auth.token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(5);
    });

    it("Should get a product by id", async () => {
      const product = await request(app)
        .post("/api/products")
        .send({
          name: "Electronics",
          description: "Electricals",
          costPrice: 500,
          price: 500,
          quantity: 5,
          supplier: supplier._id.toString(),
          category: category._id.toString(),
        })
        .set("Authorization", `Bearer ${auth.token}`);

      console.log(product.body);

      const response = await request(app)
        .get(`/api/products/${product.body.data.id}`)
        .set("Authorization", `Bearer ${auth.token}`);

      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe("Electronics");
    });

    it("should return 422 for invalid id", async () => {
      const response = await request(app)
        .get("/api/products/123")
        .set("Authorization", `Bearer ${auth.token}`);

      expect(response.status).toBe(422);
    });

    it("should return 404 if product doesn't exist", async () => {
      const response = await request(app)
        .get(`/api/products/${new Types.ObjectId()}`)
        .set("Authorization", `Bearer ${auth.token}`);

      expect(response.status).toBe(404);
    });
  });

  describe("POST /api/products", () => {
    it("should create a new product", async () => {
      const response = await request(app)
        .post("/api/products")
        .send({
          name: "Electronics",
          description: "Electricals",
          costPrice: 500,
          price: 500,
          quantity: 5,
          supplier: supplier._id.toString(),
          category: category._id.toString(),
        })
        .set("Authorization", `Bearer ${auth.token}`);

      expect(response.status).toBe(201);
    });
  });

  describe("PATCH /api/products/:id", () => {
    it("should update a product", async () => {
      const product = await request(app)
        .post("/api/products")
        .send({
          name: "Electronics",
          description: "Electricals",
          costPrice: 500,
          price: 500,
          quantity: 5,
          supplier: supplier._id.toString(),
          category: category._id.toString(),
        })
        .set("Authorization", `Bearer ${auth.token}`);

      const response = await request(app)
        .patch(`/api/products/${product.body.data.id}`)
        .set("Authorization", `Bearer ${auth.token}`)
        .send({ name: "Samsung" });

      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe("Samsung");
    });
  });

  describe("DELETE /api/products/:id", () => {
    it("should soft delete a product", async () => {
      const product = await request(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${auth.token}`)
        .send({
          name: "Laptop",
          description: "Gaming Laptop",
          price: 500,
          costPrice: 300,
          quantity: 5,
          supplier: supplier._id,
          category: category._id,
        });

      const response = await request(app)
        .delete(`/api/products/${product.body.data.id}`)
        .set("Authorization", `Bearer ${auth.token}`);

      expect(response.status).toBe(204);

      const deleted = await Product.findById(product.body.data.id);

      expect(deleted?.isActive).toBe(false);
    });
  });
});
