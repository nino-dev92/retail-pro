import jwt from "jsonwebtoken";

export const generateAccessToken = async (data: JwtPayload) => {
  const { userId, role } = data;
  return await jwt.sign({ userId, role }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = async (data: JwtPayload) => {
  const { userId, role } = data;

  return await jwt.sign(
    { userId, role },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "5d",
    },
  );
};
