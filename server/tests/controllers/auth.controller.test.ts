import request from "supertest";
import app from "../../src/app";
import User from "../../src/models/User";

describe("Auth Controller", () => {
  let user: any;

  beforeEach(async () => {
    user = await User.create({
      firstName: "Rich",
      lastName: "Nneji",
      email: "test@test.com",
      password: "12345678",
    });
  });

  describe("POST /api/auth/signup", () => {
    it("should register a new user", async () => {
      const response = await request(app).post("/api/auth/signup").send({
        firstName: "Richard",
        lastName: "Nneji",
        email: "nino@test.com",
        password: "12345678",
        confirmPassword: "12345678",
      });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User registered successfully");
      expect(response.body.data.user.firstName).toBe("Richard");
    });

    it("should return 409 if email already exists", async () => {
      const response = await request(app).post("/api/auth/signup").send({
        firstName: "Rich",
        lastName: "Nneji",
        email: "test@test.com",
        password: "12345678",
        confirmPassword: "12345678",
      });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe("User already exists");
    });

    it("should return 422 for invalid request body", async () => {
      const response = await request(app).post("/api/auth/signup").send({
        firstName: "",
        email: "bademail",
        password: "123",
      });

      expect(response.status).toBe(422);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login successfully", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "test@test.com",
        password: "12345678",
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Login Successful");

      expect(response.body.data.firstName).toBe("Rich");
      expect(response.body.data.accessToken).toBeDefined();

      expect(response.headers["set-cookie"]).toBeDefined();
    });

    it("should return 401 for invalid password", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "test@test.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it("should return 404 if user does not exist", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "nouser@test.com",
        password: "12345678",
      });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe("POST /api/auth/logout", () => {
    it("should logout successfully", async () => {
      const response = await request(app).post("/api/auth/logout");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Logged out successfully");
    });
  });

  describe("POST /api/auth/refresh", () => {
    it("should return a new access token", async () => {
      const login = await request(app).post("/api/auth/login").send({
        email: "test@test.com",
        password: "12345678",
      });

      const cookie = login.headers["set-cookie"];

      const response = await request(app)
        .post("/api/auth/refresh")
        .set("Cookie", cookie);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.accessToken).toBeDefined();
    });

    it("should return 401 if refresh token is missing", async () => {
      const response = await request(app).post("/api/auth/refresh");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Token not found");
    });

    it("should return 401 if refresh token is invalid", async () => {
      const response = await request(app)
        .post("/api/auth/refresh")
        .set("Cookie", ["refreshToken=invalidtoken"]);

      expect(response.status).toBe(401);
    });
  });
});
