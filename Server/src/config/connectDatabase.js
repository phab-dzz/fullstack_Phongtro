// const { Sequelize } = require('sequelize');
import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';
dotenv.config(); // load environment variables from .env
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DB_NAME || 'phongtro123', process.env.DB_USERNAME || 'root', process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    logging: false,
    port: process.env.DB_PORT || 5432,
    dialectOptions: {
    ssl: {
      require: true,       // Bắt buộc dùng SSL
      rejectUnauthorized: false // Tắt kiểm tra chứng chỉ CA (nếu không có)
    }
  },
});
const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
export default connectDatabase;