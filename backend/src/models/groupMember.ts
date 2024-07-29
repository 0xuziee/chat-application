import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import Group from './group';
import User from './user';

// Define the attributes of the GroupMember model
interface GroupMemberAttributes {
  groupId: string;
  userId: string;
  joinedAt?: Date;
}

interface GroupMemberCreationAttributes extends Optional<GroupMemberAttributes, 'joinedAt'> {}

class GroupMember extends Model<GroupMemberAttributes, GroupMemberCreationAttributes> implements GroupMemberAttributes {
  public groupId!: string;
  public userId!: string;
  public joinedAt?: Date;
}

// Initialize the GroupMember model
GroupMember.init(
  {
    groupId: {
      type: DataTypes.UUID,
      references: {
        model: Group,
        key: 'id',
      },
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
      primaryKey: true,
    },
    joinedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'GroupMember',
    underscored: true,
    timestamps: false,
  }
);

export default GroupMember;
