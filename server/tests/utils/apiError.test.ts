import ApiError from "../../src/utils/apiError";

describe("ApiError", () => {
  it("should create an ApiError", () => {
    const error = new ApiError("Unauthorized", 401);

    expect(error.message).toBe("Unauthorized");
    expect(error.statusCode).toBe(401);
    expect(error).toBeInstanceOf(Error);
  });

  it("should preserve stack trace", () => {
    const error = new ApiError("Bad Request", 400);

    expect(error.stack).toBeDefined();
  });
});
