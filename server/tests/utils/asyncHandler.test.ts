import { asyncHandler } from "../../src/utils/asyncHandler";

describe("asyncHandler", () => {
  it("should call next on error", async () => {
    const next = jest.fn();

    const fn = asyncHandler(async () => {
      throw new Error("Boom");
    });

    await fn({} as any, {} as any, next);

    expect(next).toHaveBeenCalled();
  });

  it("should not call next if no error", async () => {
    const next = jest.fn();

    const fn = asyncHandler(async () => {});

    await fn({} as any, {} as any, next);

    expect(next).not.toHaveBeenCalled();
  });
});
