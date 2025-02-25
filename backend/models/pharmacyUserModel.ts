import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbMySQLconfig";
import bcrypt from "bcrypt";

export interface pharmacyUserInterface {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
  role: string;
  isBlocked: string;
  SoftDeleted: boolean;
}

class pharmacyUser
  extends Model<pharmacyUserInterface>
  implements pharmacyUserInterface
{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public phoneNumber!: number;
  public role!: string;
  public isBlocked!: string;
  public SoftDeleted!: boolean;
}
pharmacyUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pharmacist",
    },
    isBlocked: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Not Blocked",
    },
    SoftDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "pharmacyUser",
    tableName: "pharmacyUser",
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
    timestamps: true,
  }
);

export default pharmacyUser;
