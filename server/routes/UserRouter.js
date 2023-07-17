import mongoose from "mongoose";
import express from "express";
import UserSchema from "../models/UserModel.js";

const router = express.Router();

router.post("/createUser", async (req, res) => {
  try {
    const { name, mobile } = req.body;
    const existingUser = await UserSchema.findOne({ mobile: mobile });
    
    if (existingUser != null) {
      return res.status(200).json(existingUser);
    }
    const user = new UserSchema({ name, mobile });
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(404).json("Something is wrong");
  }
});

router.get("/getUsers", async (req, res) => {
  try {
    const users = await UserSchema.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json("Something is wrong");
  }
});


export default router;