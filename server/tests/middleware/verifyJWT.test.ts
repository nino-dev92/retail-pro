import request from "supertest";
import app from "../../src/app";
import { getAuthenticatedUser } from "../helpers/auth";
import { ROLES } from "../../src/constants/roles";
import jwt from "jsonwebtoken";

describe("verifyJWT middleware", () => {
  let admin: any;

  beforeEach(async () => {
    admin = await getAuthenticatedUser(ROLES.ADMIN);
  });

  describe("Authentication", () => {
    it("should return 401 if no token is provided", async () => {
      const response = await request(app).get("/api/products");

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it("should return 401 if token is invalid", async () => {
      const response = await request(app)
        .get("/api/products")
        .set("Authorization", "Bearer invalid-token");

      expect(response.status).toBe(401);
    });

    it("should return 200 with a valid token", async () => {
      const response = await request(app)
        .get("/api/products")
        .set("Authorization", `Bearer ${admin.token}`);

      expect(response.status).toBe(200);
    });

    // it("should return 401 for malformed Authorization header", async () => {
    //   const response = await request(app)
    //     .get("/api/products")
    //     .set("Authorization", admin.token);

    //   expect(response.status).toBe(401);
    // });

    it("should return 401 for expired token", async () => {
      const expiredToken = jwt.sign(
        {
          userId: admin.user._id,
          role: ROLES.ADMIN,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "-10s",
        },
      );

      const response = await request(app)
        .get("/api/products")
        .set("Authorization", `Bearer ${expiredToken}`);

      expect(response.status).toBe(401);
    });
  });
});
