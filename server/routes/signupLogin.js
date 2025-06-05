const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const generateToken = require("../utils/generateToken");
const router = express.Router();
const app = express();
app.use(express.json());

router.post("/sign-up", async (req, res) => {
  try {
    const { firstName, lastName, phone, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });
    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds set to 10

    // Create a new employee with the hashed password and other fields

    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    });

    // Save the employee to the database
    const user = await newUser.save();
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Signup successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
      },
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: "Failed to sign up user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid password" });

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
