import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import z from "zod";
import bcrypt from "bcryptjs";
export const usersRoutes = express.Router();

const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    // const zodBody = await CreateUserZodSchema.parseAsync(req.body);
    const body = req.body;

    // const password = await bcrypt.hash(body.password, 10);
    // console.log(password);

    // body.password = password;

    // console.log(body, "zod body");

    //Built it and custom instance net

    // const user = new User(body);

    // const password = await user.hashPassword(body.password);
    // console.log(password);
    // user.password = password;

    // await user.save();

    //Built in and custom instance net

    const password = await User.hashPassword(body.password);
    console.log(password, "static");

    body.password = password;

    const user = await User.create(body);

    res.status(201).json({
      success: true,
      message: "User created successfuly",
      user: user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
usersRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(201).json({
    success: true,
    message: "All Users retreived successfuly",
    users,
  });
});
usersRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  res.status(201).json({
    success: true,
    message: "User retrived successfuly",
    user,
  });
});
usersRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId);

  res.status(201).json({
    success: true,
    message: "User Deleted successfuly",
    user,
  });
});
usersRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedBody = req.body;
  const user = await User.findByIdAndUpdate(userId, updatedBody, { new: true });

  res.status(201).json({
    success: true,
    message: "User updated successfuly",
    user,
  });
});
