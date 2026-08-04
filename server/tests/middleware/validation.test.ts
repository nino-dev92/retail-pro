import request from "supertest";
import app from "../../src/app";
import { getAuthenticatedUser } from "../helpers/auth";
import { ROLES } from "../../src/constants/roles";

describe("Validation middleware", () => {
  let admin: any;

  beforeEach(async () => {
    admin = await getAuthenticatedUser(ROLES.ADMIN);
  });

  it("should reject missing name", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${admin.token}`)
      .send({
        description: "Phone",
      });

    expect(res.status).toBe(422);
  });

  it("should reject invalid price", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${admin.token}`)
      .send({
        name: "iPhone",
        description: "Phone",
        price: "abc",
      });

    expect(res.status).toBe(422);
  });
});
