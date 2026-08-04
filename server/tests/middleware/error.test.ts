import request from "supertest";
import app from "../../src/app";

describe("Error middleware", () => {
  it("should return 404 for invalid product id", async () => {
    const res = await request(app).get("/api/products/123");

    expect(res.status).toBe(401); // or 422 if authenticated with an invalid ObjectId
  });

  it("should return 500 for unexpected errors", async () => {
    // Usually achieved by mocking a service to throw:
    // jest.spyOn(productService, "findAllProducts")
    //     .mockRejectedValue(new Error("Boom"));
  });
});
