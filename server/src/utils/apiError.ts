class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);

    this.name = "ApiError";

    // Restore prototype chain
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export default ApiError;
