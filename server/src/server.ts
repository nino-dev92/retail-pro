import app from "./app";
import connectDB from "./config/db";
import logger from "./logger/logger";

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      logger.info(`App is running on port ${port}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

start();
