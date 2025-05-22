import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { UserModel } from "../users/user.model";
import { IPost, IPostCreation } from "./post.types";
import { sequelize } from "../../app-configs/database-connection";

export class PostModel extends Model<IPost, IPostCreation> {}

PostModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "posts",
    timestamps: true,
    paranoid: true,
  }
);

PostModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "user",
});
UserModel.hasMany(PostModel, {
  foreignKey: "userId",
  as: "posts",
});
