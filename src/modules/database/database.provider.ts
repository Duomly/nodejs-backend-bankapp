import { Sequelize } from 'sequelize-typescript';

export const databaseProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'YOUR_HOST',
        port: 5432,
        username: 'YOUR_USERNAME',
        password: 'YOUR_PASSWORD',
        database: 'YOUR_DB_NAME'
      });
      sequelize.addModels([]);
      return sequelize;
    }
  }
]