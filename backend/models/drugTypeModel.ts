import { DataTypes, Model, STRING } from "sequelize";
import { sequelize } from "../config/dbMySQLconfig";

export interface drugTypeInterface {
  drugTypeID: string;
  drugType: string;
}

class DRUG_TYPES extends Model<drugTypeInterface> implements drugTypeInterface {
  public drugTypeID!: string;
  public drugType!: string;
}

DRUG_TYPES.init(
  {
    drugTypeID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    drugType: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "DRUG_TYPES",
    tableName: "DRUG_TYPES",
    timestamps: true,
  }
);

export default DRUG_TYPES;
