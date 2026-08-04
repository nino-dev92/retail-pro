import request from "supertest";
import app from "../../src/app";
import { getAuthenticatedUser } from "../helpers/auth";
import { ROLES } from "../../src/constants/roles";

describe("authorizeRole middleware", () => {
  it("should allow admin", async () => {
    const admin = await getAuthenticatedUser(ROLES.ADMIN);

    const res = await request(app)
      .get("/api/products")
      .set("Authorization", `Bearer ${admin.token}`);

    expect(res.status).toBe(200);
  });

  it("should allow manager", async () => {
    const manager = await getAuthenticatedUser(ROLES.MANAGER);

    const res = await request(app)
      .get("/api/products")
      .set("Authorization", `Bearer ${manager.token}`);

    expect(res.status).toBe(200);
  });

  it("should deny cashier from creating products", async () => {
    const cashier = await getAuthenticatedUser(ROLES.CASHIER);

    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${cashier.token}`)
      .send({});

    expect(res.status).toBe(403);
  });
});
