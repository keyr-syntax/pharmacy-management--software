import { DataTypes, Model, STRING } from "sequelize";
import { sequelize } from "../config/dbMySQLconfig";

export interface drugClassInterface {
  drugClassID: string;
  drugClass: string;
}

class DRUG_CLASS
  extends Model<drugClassInterface>
  implements drugClassInterface
{
  public drugClassID!: string;
  public drugClass!: string;
}

DRUG_CLASS.init(
  {
    drugClassID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    drugClass: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "DRUG_CLASS",
    tableName: "DRUG_CLASS",
    timestamps: true,
  }
);

export default DRUG_CLASS;
