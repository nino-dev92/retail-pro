import request from "supertest";
import { Types } from "mongoose";

import app from "../../src/app";
import Supplier from "../../src/models/Supplier";

jest.mock("../../src/middleware/verifyJWT.middleware", () => {
  return (req: any, res: any, next: any) => {
    req.user = {
      userId: new Types.ObjectId().toString(),
      role: "admin",
    };

    next();
  };
});

jest.mock("../../src/middleware/authorizeRole.middleware", () => {
  return () => (req: any, res: any, next: any) => next();
});

describe("Supplier Controller", () => {
  let supplier: any;

  beforeEach(async () => {
    supplier = await Supplier.create({
      name: "Nestle",
      address: "Lagos",
      contactPerson: "Richard",
      email: "nestle@test.com",
      phone: "08012345678",
      active: true,
    });
  });

  describe("POST /api/supplier", () => {
    it("should create a supplier", async () => {
      const response = await request(app).post("/api/supplier").send({
        name: "Cadbury",
        address: "Abuja",
        contactPerson: "John",
        email: "cadbury@test.com",
        phone: "09012345678",
      });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Supplier created successfully");
      expect(response.body.data.name).toBe("Cadbury");

      const dbSupplier = await Supplier.findOne({
        email: "cadbury@test.com",
      });

      expect(dbSupplier).not.toBeNull();
    });

    it("should return 409 when supplier already exists", async () => {
      const response = await request(app).post("/api/supplier").send({
        name: "Nestle",
        address: "Lagos",
        contactPerson: "Richard",
        email: "nestle@test.com",
        phone: "08012345678",
      });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe("Supplier already exists");
    });
  });

  describe("GET /api/supplier", () => {
    it("should return all suppliers", async () => {
      for (let i = 1; i <= 5; i++) {
        await Supplier.create({
          name: `Supplier ${i}`,
          address: "Lagos",
          contactPerson: "Richard",
          email: `supplier${i}@test.com`,
          phone: `080000000${i}`,
          active: true,
        });
      }

      const response = await request(app).get("/api/supplier");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(6);
    });

    it("should search suppliers", async () => {
      const response = await request(app).get("/api/supplier").query({
        search: "Nestle",
      });

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0].name).toBe("Nestle");
    });

    it("should paginate suppliers", async () => {
      for (let i = 1; i <= 15; i++) {
        await Supplier.create({
          name: `Supplier ${i}`,
          address: "Lagos",
          contactPerson: "Richard",
          email: `supplier-page-${i}@test.com`,
          phone: `081000000${i}`,
          active: true,
        });
      }

      const response = await request(app).get("/api/supplier").query({
        page: 2,
        limit: 10,
      });

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(6);
    });
  });

  describe("GET /api/supplier/:id", () => {
    it("should return a supplier", async () => {
      const response = await request(app).get(`/api/supplier/${supplier._id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe("Nestle");
    });

    it("should return 404 for non-existing supplier", async () => {
      const response = await request(app).get(
        `/api/supplier/${new Types.ObjectId()}`,
      );

      expect(response.status).toBe(404);
    });
  });

  describe("PATCH /api/supplier/:id", () => {
    it("should update a supplier", async () => {
      const response = await request(app)
        .patch(`/api/supplier/${supplier._id}`)
        .send({
          address: "Abuja",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      //expect(response.body.data.address).toBe("Lagos");

      const dbSupplier = await Supplier.findById(supplier._id);

      //expect(dbSupplier?.address).toBe("Abuja");
    });

    it("should return 404 if supplier does not exist", async () => {
      const response = await request(app)
        .patch(`/api/supplier/${new Types.ObjectId()}`)
        .send({
          address: "Abuja",
        });

      expect(response.status).toBe(404);
    });
  });

  describe("PATCH /api/supplier/:id/status", () => {
    it("should deactivate supplier", async () => {
      const response = await request(app)
        .patch(`/api/supplier/${supplier._id}/status`)
        .send({
          status: false,
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      const dbSupplier = await Supplier.findById(supplier._id);

      expect(dbSupplier?.active).toBe(false);
    });

    it("should activate supplier", async () => {
      await Supplier.findByIdAndUpdate(supplier._id, {
        active: false,
      });

      const response = await request(app)
        .patch(`/api/supplier/${supplier._id}/status`)
        .send({
          status: true,
        });

      expect(response.status).toBe(200);

      const dbSupplier = await Supplier.findById(supplier._id);

      expect(dbSupplier?.active).toBe(true);
    });

    it("should return 404 when supplier does not exist", async () => {
      const response = await request(app)
        .patch(`/api/supplier/${new Types.ObjectId()}/status`)
        .send({
          status: false,
        });

      expect(response.status).toBe(404);
    });
  });
});
