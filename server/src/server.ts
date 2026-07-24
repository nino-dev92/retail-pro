import app from "./app";
import connectDB from "./config/db";

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
