import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const genrateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  console.log(user);
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;
  user.save();
  return { refreshToken, accessToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullname, email, password, bio } = req.body;
  if (
    [username, fullname, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Fill all required fields");
  }
  const isUserExist = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserExist) {
    throw new ApiError(409, "User with same username/ email exist");
  }

  console.log("files uploaded: ", req?.file?.path);

  const avatarLocalPath = req?.file?.path;
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (avatarLocalPath && !avatar) {
    throw new ApiError(400, "Avatar not uploaded properly");
  }
  // console.log(avatar, avatarLocalPath);
  const user = await User.create({
    fullname,
    avatar: avatar?.url || "",
    email,
    username: username?.toLowerCase(),
    password,
    bio: bio || "",
  });
  const registeredUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!registeredUser) {
    throw ApiError(400, "Something went wrong while registering USER");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, registeredUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    throw new ApiError(400, "username is required");
  }
  const user = await User.findOne({ username: username });
  console.log(user);
  if (!user) {
    throw new ApiError(404, "Check username/ password");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  console.log(isPasswordCorrect);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password");
  }

  const { refreshToken, accessToken } = await genrateAccessAndRefreshToken(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "User login successfull"));
});

export { registerUser, loginUser };
