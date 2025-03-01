import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/dbMySQLconfig";

export interface drugManufacturersInterface {
  manufacturerID?: string;
  manufacturerName: string;
  contactName: string;
  phoneNumber: string;
  licenseNumber: string;
  softDeleted: boolean;
}

class DRUG_MANUFACTURERS
  extends Model<drugManufacturersInterface>
  implements drugManufacturersInterface
{
  public manufacturerID!: string;
  public manufacturerName!: string;
  public contactName!: string;
  public phoneNumber!: string;
  public licenseNumber!: string;
  public softDeleted!: boolean;
}

DRUG_MANUFACTURERS.init(
  {
    manufacturerID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    manufacturerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    licenseNumber: {
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
    modelName: "DRUG_MANUFACTURERS",
    tableName: "DRUG_MANUFACTURERS",
    timestamps: true,
  }
);

export default DRUG_MANUFACTURERS;
