import mongoose from "mongoose";

const dbURL = process.env.MONGO_URI;

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
