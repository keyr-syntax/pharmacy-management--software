import { DataTypes, Model, STRING } from "sequelize";
import { sequelize } from "../config/dbMySQLconfig";

export interface drugsInterface {
  drugID?: string;
  genericName: string;
  brandName: string;
  dosageForm: string;
  drugType: string;
  dosageStrength: string;
  routeOfDrugAdministration: string;
  unitsPerPack: number;
  manufacturerID: string;
  drugClass: string;
  status: string;
  softDeleted: boolean;
}

class DRUGS extends Model<drugsInterface> implements drugsInterface {
  public drugID!: string;
  public genericName!: string;
  public brandName!: string;
  public dosageForm!: string;
  public drugType!: string;
  public dosageStrength!: string;
  public routeOfDrugAdministration!: string;
  public unitsPerPack!: number;
  public manufacturerID!: string;
  public drugClass!: string;
  public status!: string;
  public softDeleted!: boolean;
}

DRUGS.init(
  {
    drugID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    genericName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dosageForm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    drugType: {
      type: DataTypes.ENUM("OTC", "Prescription"),
      allowNull: false,
    },
    dosageStrength: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    routeOfDrugAdministration: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    unitsPerPack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    manufacturerID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "DRUG_MANUFACTURERS",
        key: "manufacturerID",
      },
    },
    drugClass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Active", "Discontinued", "Out of Stock"),
      allowNull: false,
      defaultValue: "Active",
    },
    softDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "DRUGS",
    tableName: "DRUGS",
    timestamps: true,
  }
);

export default DRUGS;
