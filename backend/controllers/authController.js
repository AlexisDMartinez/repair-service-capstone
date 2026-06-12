const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      securityQuestion,
      securityAnswer
    } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const userExists = await User.findOne({
      email: normalizedEmail
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedSecurityAnswer = await bcrypt.hash(
      securityAnswer.toLowerCase().trim(),
      10
    );

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "user",
      securityQuestion,
      securityAnswer: hashedSecurityAnswer
    });

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to register user",
      error: error.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid login credentials"
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid login credentials"
      });
    }

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to login",
      error: error.message
    });
  }
};

const getSecurityQuestion = async (req, res) => {
  try {
    const { email } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail
    });

    if (!user || !user.securityQuestion) {
      return res.status(404).json({
        message: "No account or security question found for that email."
      });
    }

    res.json({
      securityQuestion: user.securityQuestion
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get security question",
      error: error.message
    });
  }
};

const resetPasswordWithSecurityAnswer = async (req, res) => {
  try {
    const {
      email,
      securityAnswer,
      newPassword
    } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail
    });

    if (!user) {
      return res.status(404).json({
        message: "No account found with that email address."
      });
    }

    const answerMatches = await bcrypt.compare(
      securityAnswer.toLowerCase().trim(),
      user.securityAnswer
    );

    if (!answerMatches) {
      return res.status(401).json({
        message: "Security answer is incorrect."
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({
      message: "Password reset successfully. You can now log in."
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to reset password",
      error: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getSecurityQuestion,
  resetPasswordWithSecurityAnswer
};

