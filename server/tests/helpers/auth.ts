import request from "supertest";
import app from "../../src/app";
import User from "../../src/models/User";
import { ROLES } from "../../src/constants/roles";

export const getAuthenticatedUser = async (
  role: (typeof ROLES)[keyof typeof ROLES] = ROLES.CASHIER,
) => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: `john${Date.now()}@test.com`,
    password: "Password123!",
    confirmPassword: "Password123!",
  };

  await request(app).post("/api/auth/signup").send(user);

  // Promote the user to the requested role
  await User.findOneAndUpdate({ email: user.email }, { role });

  const login = await request(app).post("/api/auth/login").send({
    email: user.email,
    password: user.password,
  });

  return {
    token: login.body.data.accessToken,
    user: login.body.data,
  };
};
