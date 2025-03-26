/** @format */

import express from "express";
import User from "../schema/user.js";

const registrationRouter = express.Router();

// Check if an email exists in the database
registrationRouter.post("/checkEmail", async (req, res) => {
  const { email } = req.body;

  try {
    // Validate email input
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if email exists in the database
    const user = await User.findOne({ email: String(email) });

    // Respond based on whether the email exists
    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking email existence:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Register a new user
registrationRouter.post("/registerUser", async (req, res) => {
  const userData = req.body;
  //console.log(userData);
  if (!userData) {
    return res.status(400).json({ message: "User data is required" });
  }

  try {
    // Example user creation
    const newUser = new User(userData);
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default registrationRouter;
