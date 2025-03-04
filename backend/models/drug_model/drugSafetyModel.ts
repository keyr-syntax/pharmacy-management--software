import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/dbMySQLconfig";

export interface drugSafetyInterface {
  drugSafetyID?: string;
  drugID: string;
  contraindications?: string;
  drugInteractions?: string;
  pregnancyCategory: string;
  maxDailyDose?: string;
  softDeleted: boolean;
}

class DRUG_SAFETY
  extends Model<drugSafetyInterface>
  implements drugSafetyInterface
{
  public drugSafetyID!: string;
  public drugID!: string;
  public contraindications?: string;
  public drugInteractions?: string;
  public pregnancyCategory!: string;
  public maxDailyDose?: string;
  public softDeleted!: boolean;
}

DRUG_SAFETY.init(
  {
    drugSafetyID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    drugID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "DRUGS",
        key: "drugID",
      },
    },
    contraindications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    drugInteractions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pregnancyCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxDailyDose: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    softDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "DRUG_SAFETY",
    tableName: "DRUG_SAFETY",
    timestamps: true,
  }
);

export default DRUG_SAFETY;