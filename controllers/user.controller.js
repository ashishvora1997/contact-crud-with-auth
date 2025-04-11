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
  console.log("User available", isUserAvailable);

  if (isUserAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password", hashedPassword);

  // Create a new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  console.log("user", user);

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
  // res.status(200).json({
  //   message: "User registration route",
  //   name,
  //   email,
  //   password,
  //   hashedPassword
  // });
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

  // res.status(200).json({
  //   message: "User login route",
  //   email,
  //   password,
  // });
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

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  // updateUserProfile,
  // deleteUser,
};
