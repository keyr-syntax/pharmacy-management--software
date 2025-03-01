import { DataTypes, Model, STRING } from "sequelize";
import { sequelize } from "../../config/dbMySQLconfig";

export interface drugClassInterface {
  drugClassID?: string;
  drugClass: string;
  softDeleted: boolean;
}

class DRUG_CLASS
  extends Model<drugClassInterface>
  implements drugClassInterface
{
  public drugClassID!: string;
  public drugClass!: string;
  public softDeleted!: boolean;
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    softDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
