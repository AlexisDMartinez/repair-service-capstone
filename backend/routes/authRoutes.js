const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getSecurityQuestion,
  resetPasswordWithSecurityAnswer
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/security-question", getSecurityQuestion);
router.put("/reset-password-security", resetPasswordWithSecurityAnswer);

module.exports = router;

