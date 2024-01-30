import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";

const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log("Mongodb connection: ", dbConnection.connection.host);
  } catch (error) {
    console.error("MongoDB Connection Error: ", error);
    throw error;
  }
};
export default connectDB;
