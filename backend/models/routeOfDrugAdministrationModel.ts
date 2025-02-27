import { DataTypes, Model, STRING } from "sequelize";
import { sequelize } from "../config/dbMySQLconfig";

export interface routeOfDrugAdministrationInterface {
  routeOfDrugAdministrationID: string;
  routeOfDrugAdministration: string;
  softDeleted: boolean;
}

class ROUTE_OF_DRUG_ADMINISTRATION
  extends Model<routeOfDrugAdministrationInterface>
  implements routeOfDrugAdministrationInterface
{
  public routeOfDrugAdministrationID!: string;
  public routeOfDrugAdministration!: string;
  public softDeleted!: boolean;
}

ROUTE_OF_DRUG_ADMINISTRATION.init(
  {
    routeOfDrugAdministrationID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    routeOfDrugAdministration: {
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
    modelName: "ROUTE_OF_DRUG_ADMINISTRATION",
    tableName: "ROUTE_OF_DRUG_ADMINISTRATION",
    timestamps: true,
  }
);

export default ROUTE_OF_DRUG_ADMINISTRATION;
