import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./user";
import Group from "./group";

interface MessageAttributes {
  id: string;
  senderId: string;
  receiverId: string;
  groupId?: string;
  messageType: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, "id"> {}

class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes
{
  public id!: string;
  public senderId!: string;
  public receiverId!: string;
  public groupId?: string;
  public messageType!: string;
  public content?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users", // Ensure this matches your User table name
        key: "id",
      },
    },
    receiverId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users", // Ensure this matches your User table name
        key: "id",
      },
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "groups", // Ensure this matches your Group table name
        key: "id",
      },
    },
    messageType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Message",
    tableName: "messages",
    underscored: false,
    timestamps: true,
  }
);

export default Message;
