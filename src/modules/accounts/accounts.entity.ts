import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { TableOptions } from 'sequelize-typescript';
import { Users } from '../user/user.entity';

const tableOptions: TableOptions = { timestamp: true, tableName: 'Accounts' } as TableOptions;

@Table(tableOptions)
export class Accounts extends Model<Accounts> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    type: DataType.CHAR(200),
    allowNull: false,
  })
  public Type: string;

  @Column({
    type: DataType.CHAR(200),
    allowNull: false,
  })
  public Name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  public Balance: number;

  @ForeignKey(() => Users)
  public UserId: number;

  @BelongsTo(() => Users, {
    as: 'Users',
    foreignKey: 'UserId',
    targetKey: 'id',
  })
  public Users: Users;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;
}