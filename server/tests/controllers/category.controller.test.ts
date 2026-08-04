import request from "supertest";
import app from "../../src/app";
import User from "../../src/models/User";
import Category from "../../src/models/Category";

const USER_ID = "507f1f77bcf86cd799439011";

jest.mock("../../src/middleware/verifyJWT.middleware", () => {
  return (req: any, res: any, next: any) => {
    req.user = { userId: USER_ID, role: "admin" };
    next();
  };
});

jest.mock("../../src/middleware/authorizeRole.middleware", () => {
  return () => (req: any, res: any, next: any) => next();
});

describe("category controller", () => {
  let user: any;
  let category: any;
  beforeEach(async () => {
    user = await User.create({
      _id: USER_ID,
      firstName: "Richard",
      lastName: "Italian",
      password: "12345678",
      email: "test@test.com",
    });
    category = await Category.create({
      name: "Electronic",
      description: "Electronic goods",
    });
  });

  describe("POST /api/category", () => {
    it("should create a new category", async () => {
      const response = await request(app)
        .post("/api/category")
        .send({ name: "Electronics", description: "Electrical parts" });
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Category created Successfully");
    });
  });

  describe("GET /api/category", () => {
    it("should get all categories", async () => {
      for (let i = 1; i <= 5; i++) {
        await Category.create({
          name: `Category${i}`,
          description: `Description${i}`,
        });
      }
      const response = await request(app).get("/api/category");
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("All Categories");
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(6);
    });
  });

  describe("PATCH /api/category", () => {
    it("should edit a category", async () => {
      const response = await request(app)
        .patch(`/api/category/${category._id.toString()}`)
        .send({ name: "Electricals" });
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Category updated successfully");
      expect(response.body.data.name).toBe("Electricals");
    });
  });

  describe("DELETE /api/category", () => {
    it("should soft delete a category", async () => {
      const dbcategory = await Category.create({
        name: "Books",
        description: "Reading material",
      });
      const response = await request(app)
        .delete(`/api/category/${dbcategory._id.toString()}`)
        .send({ change: false });

      expect(response.status).toBe(204);

      const updatedCategory = await Category.findById(dbcategory._id);

      expect(updatedCategory).not.toBeNull();
      expect(updatedCategory?.isActive).toBe(false);
    });
  });
});
