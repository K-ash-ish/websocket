import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);
// api/v1/users/something

export { app };
