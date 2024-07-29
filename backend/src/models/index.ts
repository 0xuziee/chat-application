import User from './user';
import Message from './message';
import Media from './media';
import Group from './group';
import GroupMember from './groupMember';

User.hasMany(Message, { foreignKey: 'senderId' });
User.hasMany(Message, { foreignKey: 'receiverId' });
User.hasMany(Media, { foreignKey: 'userId' });
User.belongsToMany(Group, { through: GroupMember, foreignKey: 'userId' });

Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });
Message.hasMany(Media, { foreignKey: 'messageId' });

Group.hasMany(GroupMember, { foreignKey: 'groupId' });
Group.belongsToMany(User, { through: GroupMember, foreignKey: 'groupId' });


