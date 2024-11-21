// routes/userRoutes.js

import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import authenticateJWT from "../middleware/auth.js";
import authorizeRole from "../middleware/authorizeRole.js";

const router = express.Router();

// Get all users (admin only)
router.get("/", authenticateJWT, authorizeRole("admin"), async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "role"], // Exclude sensitive fields like password
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile (authenticated user)
router.get("/profile", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "username", "role"],
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile (authenticated user)
router.put("/profile", authenticateJWT, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Update fields if provided
    const updates = {};
    if (username) updates.username = username;
    if (password) updates.password = await bcrypt.hash(password, 10);

    await User.update(updates, { where: { id: req.user.id } });
    res.json({ message: "Profile updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user (admin only)
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      await User.destroy({ where: { id: req.params.id } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
