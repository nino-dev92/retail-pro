import request from "supertest";
import app from "../../src/app";

describe("Auth Routes", () => {
  describe("POST /api/auth/signup", () => {
    it("should register a user", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@gmail.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("User registered successfully");
      expect(res.body.data.user).toHaveProperty("id");
    });

    // it("should return 422 for invalid request", async () => {
    //   const res = await request(app).post("/api/auth/signup").send({
    //     firstName: "",
    //     email: "bademail",
    //     password: "123",
    //   });

    //   expect(res.status).toBe(422);
    //   expect(res.body.success).toBe(false);
    // });

    it("should not register an existing user", async () => {
      const user = {
        firstName: "John",
        lastName: "Doe",
        email: "john@gmail.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      };

      await request(app).post("/api/auth/signup").send(user);

      const res = await request(app).post("/api/auth/signup").send(user);

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
    });

    it("should login successfully", async () => {
      const user = {
        firstName: "John",
        lastName: "Doe",
        email: "john@gmail.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      };

      await request(app).post("/api/auth/signup").send(user);

      const res = await request(app).post("/api/auth/login").send({
        email: user.email,
        password: user.password,
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("accessToken");
      expect(res.headers["set-cookie"]).toBeDefined();
    });
  });
});
