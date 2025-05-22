import { Router, Request, Response, NextFunction } from "express";
import { CommentModel } from "./comment.model";
import { IComment } from "./comment.types";
import { UserModel } from "../users/user.model";
import { PostModel } from "../posts/post.model";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId, userId } = req.query;
    const posts = await CommentModel.findAll({ postId, userId } as any);
    res.status(200).json({
      message: "Get All Comments",
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
    const post = req.body as Pick<IComment, "message" | "postId" | "userId">;
    const { userId, postId } = post;
    const user = await UserModel.findOne({ where: { id: userId } } as any);
    const existingPost = await PostModel.findOne({
      where: { id: postId },
    } as any);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    if (!existingPost) {
      res.status(404).json({
        message: "Post not found",
      });
    }
    const createdPost = await CommentModel.create(post);
    res.status(201).json({
      message: "Comment Posted",
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
