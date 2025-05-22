import express from "express";
import userRouter from "./modules/users/user.routes";
import postRouter from "./modules/posts/post.routes";
import commentsRouter from "./modules/comments/comment.routes";
import { databaseConnection } from "./app-configs/database-connection";

const app = express();
const port = process.env.PORT || 3000;

export const startServer = async () => {
  try {
    await databaseConnection();
    app.use(express.json());
    app.use("/api/users", userRouter);
    app.use("/api/posts", postRouter);
    app.use("/api/comments", commentsRouter);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};
