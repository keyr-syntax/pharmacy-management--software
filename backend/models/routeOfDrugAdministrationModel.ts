import { DataTypes, Model, STRING } from "sequelize";
import { sequelize } from "../config/dbMySQLconfig";

export interface routeOfDrugAdministrationInterface {
  routeOfDrugAdministrationID: string;
  routeOfDrugAdministration: string;
}

class ROUTE_OF_DRUG_ADMINISTRATION
  extends Model<routeOfDrugAdministrationInterface>
  implements routeOfDrugAdministrationInterface
{
  public routeOfDrugAdministrationID!: string;
  public routeOfDrugAdministration!: string;
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
      type: STRING,
      allowNull: false,
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
