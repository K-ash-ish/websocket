import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unathorised Access");
    }

    const isTokenVerified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!isTokenVerified) {
      throw new ApiError(401, "Invalid access token");
    }
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export { verifyJWT };
