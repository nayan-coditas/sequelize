import { Router, Request, Response, NextFunction } from "express";
import { PostModel } from "./post.model";
import { IPost } from "./post.types";
import { UserModel } from "../users/user.model";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.query;
    const posts = await PostModel.findAll({ where: { userId } } as any);
    res.status(200).json({
      message: "Get All Posts",
      data: posts,
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
    const post = req.body as Pick<IPost, "title" | "content" | "userId">;
    const { userId } = post;
    const user = await UserModel.findOne({ id: userId } as any);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    const createdPost = await PostModel.create(post);
    res.status(201).json({
      message: "Post created",
      data: createdPost,
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
