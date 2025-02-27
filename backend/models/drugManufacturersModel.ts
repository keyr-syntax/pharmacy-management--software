import { DataTypes, Model, STRING } from "sequelize";
import { sequelize } from "../config/dbMySQLconfig";

export interface drugManufacturersInterface {
  manufacturerID: string;
  manufacturer: string;
}

class DRUG_MANUFACTURERS
  extends Model<drugManufacturersInterface>
  implements drugManufacturersInterface
{
  public manufacturerID!: string;
  public manufacturer!: string;
}

DRUG_MANUFACTURERS.init(
  {
    manufacturerID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    manufacturer: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "DRUG_MANUFACTURERS",
    tableName: "DRUG_MANUFACTURERS",
    timestamps: true,
  }
);

export default DRUG_MANUFACTURERS;
