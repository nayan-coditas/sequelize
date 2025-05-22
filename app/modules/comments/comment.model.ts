import { DataTypes, Model } from "sequelize";
import { IComment, ICommentCreation } from "./comment.types";
import { sequelize } from "../../app-configs/database-connection";
import { PostModel } from "../posts/post.model";
import { UserModel } from "../users/user.model";

export class CommentModel extends Model<IComment, ICommentCreation> {}

CommentModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "comments",
    timestamps: true,
    paranoid: true,
  }
);

CommentModel.belongsTo(PostModel, {
  foreignKey: "postId",
  as: "post",
});
PostModel.hasMany(CommentModel, {
  foreignKey: "postId",
  as: "comments",
});

CommentModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "user",
});
UserModel.hasMany(CommentModel, {
  foreignKey: "userId",
  as: "comments",
});
