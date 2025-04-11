const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/user.controller");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);


router.get("/profile", validateToken, getUserProfile);

module.exports = router;

