import mongoose from "mongoose";
import env from "./env";

const dbURL = env.MONGO_URI.toString();

if (!dbURL) {
  throw new Error("MONGO_URI is missing");
}

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL as string, {
      dbName: "retail-pro",
    });

    console.log("DB Connected");
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default connectDB;
