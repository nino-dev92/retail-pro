import "dotenv/config";
import app from "./app";
import connectDB from "./config/db";
import logger from "./logger/logger";
import env from "./config/env";

const start = async () => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      logger.info(`App is running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

start();
