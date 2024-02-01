// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Server error: ", error);
      throw error;
    });

    app.listen(process.env.PORT, (req, res) => {
      console.log("Server started at PORT: ", process.env.PORT);
    });
  })
  .catch((error) => console.log("MongoDb connecion failed: ", error));