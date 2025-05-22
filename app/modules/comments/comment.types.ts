import { Optional } from "sequelize";

export interface IComment {
  id: string;
  message: string;
  postId: string;
  userId: string;
}

export interface ICommentCreation extends Optional<IComment, "id"> {}
