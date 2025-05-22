import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../app-configs/database-connection";
import { IUser, IUserCreation } from "./user.types";

export class UserModel extends Model<IUser, IUserCreation> implements IUser {
  public id!: string;
  public name!: string;
  public email!: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    paranoid: true,
  }
);
