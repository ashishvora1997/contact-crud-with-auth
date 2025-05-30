const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.modal");

/**
 * @desc Register user
 * @route POST /api/users/register
 * @access Public
 * @param {*} req
 * @param {*} res
 */

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Validate the request body
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const isUserAvailable = await User.findOne({ email });

  if (isUserAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      message: "Register successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        password,
      },
    });
  } else {
    res.status(400);
    throw new Error("User registration failed");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Validate the request body
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not Registered");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate JWT token
    const token = jwt.sign(
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({
      token,
    });
  }

  res.status(401);
  throw new Error("Invalid credentials");
});

/**
 * @desc Get user profile
 * @route GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "User profile",
    user: req.user,
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const userDetail = await User.findById(req.user.id);

  if (!userDetail) {
    res.status(404);
    throw new Error("User not found");
  }

  const updateUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });
  console.log("userDetail", req.user, userDetail);
  res.status(200).json({
    message: "user update successfully",
    // user: updateUser,
  });
});

const deleteUserProfile = asyncHandler(async (req, res) => {
  await User.deleteOne({ _id: req.user.id });
  res.status(200).json({
    message: `Delete Contact route, id: ${req.user.id}`,
    user: req.user,
  });
});

const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  // Validate the request body
  if (!oldPassword || !newPassword) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const userDetail = await User.findById(req.user.id);

  if (await bcrypt.compare(oldPassword, userDetail.password)) {
    const password = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(
      req.user.id,
      { password },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Password updated successfully",
    });
  }
  res.status(401);
  throw new Error("Invalid credentials");
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  changeUserPassword,
};
