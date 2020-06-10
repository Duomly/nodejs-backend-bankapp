import * as Sequelize from 'sequelize';

const tableName = 'Users';

export async function up(i: any) {
  const queryInterface = i.getQueryInterface() as Sequelize.QueryInterface;
  queryInterface.createTable(tableName, {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    Username: {
      type: Sequelize.CHAR(200),
      allowNull: false,
    },
    Email: {
      type: Sequelize.CHAR(50),
      allowNull: false,
    },
    Password: {
      type: Sequelize.CHAR(250),
      allowNull: false,
    },
    Salt: {
      type: Sequelize.CHAR(250),
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    }
  });
};

export async function down(i: any) {
  const queryInterface = i.getQueryInterface() as Sequelize.QueryInterface;
  queryInterface.dropTable(tableName);
}