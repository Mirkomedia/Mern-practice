// routes/user.route.js
import express from "express";
import { createUser, deleteUser, getUsers, updateUser, getUser } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import isAdmin from "../middleware/isAdmin.js";


const router = express.Router();

// Login route (no `isAuthenticated` middleware here)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  try {
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
    req.session.userName = user.name
    
    return res.status(200).json({ message: "Logged in successfully", user: user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
//logout
router.post("/logout", (req, res) => {
  if (req.session) {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ message: "Failed to log out" });
      }
      // Clear the cookie
      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      return res.status(200).json({ message: "Logged out successfully" });
    });
  } else {
    return res.status(400).json({ message: "No active session to log out from" });
  }
});


// Protect other routes with `isAuthenticated` as needed
router.get("/", isAuthenticated, isAdmin, getUsers);
router.get("/:id", isAuthenticated,  getUser);
router.post("/", createUser);
router.put("/:id", isAuthenticated, updateUser);
router.delete("/:id", isAuthenticated, isAdmin, deleteUser);

export default router;
