// routes/auth.js

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// User registration route
router.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user (without assigning to a variable if not needed)
    await User.create({
      username,
      password: hashedPassword,
      role: role || "user", // Default role is 'user' if not provided
    });

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "An error occurred during registration." });
  }
});
// User login route
router.post("/login", async (req, res) => {
  console.log("Login route reached"); // To confirm route is accessed

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // Log environment secret for debugging
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET, // Check here if undefined or empty
      { expiresIn: "1h" }
    );

    // Log the generated token (or decoded parts if concerned about exposure)
    console.log("Generated Token:", token);

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login." });
  }
});


export default router;
