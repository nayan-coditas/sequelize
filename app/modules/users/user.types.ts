import { Optional } from "sequelize";

export interface IUser {
  id?: string;
  name: string;
  email: string;
}

export interface IUserCreation extends Optional<IUser, "id"> {}
