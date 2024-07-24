import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('chat_app', 'postgres', 'password', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;
