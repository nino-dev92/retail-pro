import userValidationSchema from "../validators/auth.validator";
import Users from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ROLES } from "../constants/roles";
import ApiError from "../utils/apiError";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import dotenv from "dotenv";
dotenv.config({ debug: true });

type RegisterDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

type LoginDTO = {
  email: string;
  password: string;
};

export const registerUser = async (data: RegisterDTO) => {
  const { firstName, lastName, email, password, role } = data;

  let registeredRole: any;
  if (role) {
    if (role === "cashier") registeredRole = ROLES.CASHIER;
    if (role === "manager") registeredRole = ROLES.MANAGER;
    if (role === "admin") registeredRole = ROLES.ADMIN;
  }

  await userValidationSchema.validateAsync(data);

  const exists = await Users.findOne({ email });

  if (exists) throw new ApiError("User already exists", 409);

  const newUser = await Users.create({
    firstName,
    lastName,
    email,
    password,
    role: registeredRole,
  });

  const accessToken = await generateAccessToken({
    userId: newUser._id.toString(),
    role: newUser.role,
  });

  return {
    user: {
      firstName,
      lastName,
      email,
      role: newUser.role,
      id: newUser._id.toString(),
    },
    accessToken,
  };
};

export const signIn = async (data: LoginDTO) => {
  const { email, password } = data;

  const existingUser = await Users.findOne({ email }).select("+password");

  if (!existingUser) throw new ApiError("User not found", 404);

  const validPassword = await bcrypt.compare(
    password,
    existingUser.password as string,
  );

  if (!validPassword) throw new ApiError("Invalid Email or Password", 401);

  const accessToken = await generateAccessToken({
    userId: existingUser._id.toString(),
    role: existingUser.role,
  });

  const refreshToken = await generateRefreshToken({
    userId: existingUser._id.toString(),
    role: existingUser.role,
  });

  const tokenHash = await bcrypt.hash(
    refreshToken,
    parseInt(process.env.BCRYPT_SALT_ROUNDS as string),
  );

  await existingUser.updateOne({ refreshToken: tokenHash });

  existingUser.save();

  return {
    user: {
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      role: existingUser.role,
      id: existingUser._id,
    },
    accessToken,
    refreshToken,
  };
};

export const refreshTokenService = async (refreshToken: string) => {
  let decoded: JwtPayload;

  try {
    decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string,
    ) as JwtPayload;
  } catch {
    throw new ApiError("Unauthorized", 401);
  }

  const user = await Users.findById(decoded.userId).select("+refreshToken");

  if (!user) {
    throw new ApiError("User not found", 401);
  }

  if (!user.refreshToken) {
    throw new ApiError("Unauthorized", 401);
  }

  const verifiedToken = await bcrypt.compare(refreshToken, user.refreshToken);

  if (!verifiedToken) {
    throw new ApiError("Unauthorized", 401);
  }

  return await generateAccessToken({
    userId: user._id.toString(),
    role: user.role,
  });
};
