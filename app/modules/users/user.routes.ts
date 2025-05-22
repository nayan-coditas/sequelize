import { Router, Request, Response, NextFunction } from "express";
import { UserModel } from "./user.model";
import { IUser } from "./user.types";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserModel.findAll({});
    res.status(200).json({
      message: "Users route",
      data: users,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Error creating user",
      error: error,
    });
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body as Pick<IUser, "name" | "email">;
    const existingUser = await UserModel.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      res.status(409).json({
        message: "User already exists with same email",
      });
    }
    const createUser = await UserModel.create(user);
    res.status(201).json({
      message: "User created",
      data: createUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Error creating user",
      error: error,
    });
  }
});

export default router;
