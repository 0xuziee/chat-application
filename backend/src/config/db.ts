import { Sequelize } from 'sequelize';

// Database configuration
const sequelize = new Sequelize('chat_app', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Optional: Set to true for debugging
});

// Function to test the database connection
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Export sequelize instance for use in other parts of the application
export default sequelize;
