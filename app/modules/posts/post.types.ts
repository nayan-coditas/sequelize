import { Optional } from "sequelize";

export interface IPost {
  id?: string;
  title: string;
  content: string;
  userId: string;
}

export interface IPostCreation extends Optional<IPost, "id"> {}
