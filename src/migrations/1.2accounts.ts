import * as Sequelize from 'sequelize';

const tableName = 'Accounts';

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
    Type: {
      type: Sequelize.CHAR(200),
      allowNull: false,
    },
    Name: {
      type: Sequelize.CHAR(200),
      allowNull: false,
    },
    Balance: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    UserId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
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