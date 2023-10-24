import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import authModel from "../Model/authModel";
import { streamUpload } from "../utills/streamUpload";

export const createUser = async (req: any, res: Response) => {
  try {
    const { email, userName, password, bio } = req.body;

    const salt: any = await bcrypt.genSalt(10);
    const hash: any = await bcrypt.hash(password, salt);

    const { secure_url, public_id }: any = await streamUpload(req);

    const user = await authModel.create({
      email,
      userName,
      password: hash,
      bio,
      avatarUrl: public_id,
      avatar: secure_url,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "Error creating user",
      data: error.message,
    });
  }
};

export const veiwUser = async (req: Request, res: Response) => {
  try {
    const user = await authModel.find();

    return res.status(200).json({
      message: `${user.length} users found`,
      data: user,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error",
      data: error.message,
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authModel.findOne({ email: email });

    if (user) {
      const checked = await bcrypt.compare(password, user.password!);
      if (checked) {
        const token = jwt.sign(
          {
            id: user._id,
          },
          "secret"
        );
        return res.status(201).json({
          message: "success",
          data: token,
        });
      } else {
        return res.status(404).json({
          message: "invalid password",
        });
      }
    } else {
      return res.status(404).json({
        message: "user not found",
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "error",
      data: error.message,
    });
  }
};

export const updateUser = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;

    const { secure_url, public_id }: any = await streamUpload(req);

    const user = await authModel.findByIdAndUpdate(
      userID,
      { avatar: secure_url, avatarUrl: public_id },
      { new: true }
    );
    return res.status(201).json({
      message: "success",
      data: user,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "Error updating user",
      data: error.message,
    });
  }
};

export const findOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await authModel.findById(userID);
    return res.status(200).json({
      message: "Success",
      data: user,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error",
      data: error.message,
    });
  }
};

export const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await authModel.findByIdAndDelete(userID);
    return res.status(200).json({
      message: "Success",
      data: user,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "error",
      data: error.message,
    });
  }
};
