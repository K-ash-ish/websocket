import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullname, email, password, bio } = req.body;
  if (
    [username, fullname, email, password].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "Fill all required fields");
  }
  const isUserExist = User.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserExist) {
    throw new ApiError(409, "User with same username/ email exist");
  }
  console.log("files uploaded: ", req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar not uploaded properly");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url || "",
    email,
    username: username.toLowerCase(),
    password,
  });
  const registeredUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!registerUser) {
    throw ApiError(400, "Something went wrong while registering USER");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, registerUser, "User registered successfully"));
});

export { registerUser };
