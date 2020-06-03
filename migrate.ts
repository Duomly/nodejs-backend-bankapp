import { Sequelize } from 'sequelize-typescript';
import Umzug = require('umzug');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: { sequelize },
  logging: false,
  migrations: {
    params: [
      sequelize,
      sequelize.constructor,
    ],
    path: './src/migrations',
    pattern: /\.ts$/,
  },
});

const task = (process.argv[2] || '').trim();

switch (task) {
  case 'up':
    umzug.up()
      .then((result) => {
        console.log('Migrations up went successful!', result);
        process.exit(0);
      });
    break;
  case 'down':
    umzug.down()
      .then((result) => {
        console.log('Migrations down went successful!', result);
        process.exit(0);
      });
    break;
  default:
    break;
};