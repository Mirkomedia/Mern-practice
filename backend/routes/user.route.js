// routes/user.route.js
import express from "express";
import { createUser, deleteUser, getUsers, updateUser, getUser } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";

const router = express.Router();

// Login route (no `isAuthenticated` middleware here)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Assuming `User` is your user model
    const user = await User.findOne({ name: username });
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare the hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Set session data
    req.session.userId = user._id;
    res.json({ message: "Logged in successfully", user: user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Protect other routes with `isAuthenticated` as needed
router.get("/", isAuthenticated, getUsers);
router.get("/:id", isAuthenticated, getUser);
router.post("/", createUser);
router.put("/:id", isAuthenticated, updateUser);
router.delete("/:id", isAuthenticated, deleteUser);

export default router;
