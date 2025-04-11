const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile, changeUserPassword } = require("../controllers/user.controller");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", validateToken, getUserProfile);

router.patch("/profile", validateToken, updateUserProfile);

router.delete("/profile", validateToken, deleteUserProfile);

router.post("/changePassword", validateToken, changeUserPassword);


module.exports = router;

