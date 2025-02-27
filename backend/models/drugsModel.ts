import { DataTypes, Model, STRING } from "sequelize";
import { sequelize } from "../config/dbMySQLconfig";

export interface drugsInterface {
  drugID: string;
  genericName: string;
  brandName: string;
  dosageForm: string;
  drugType: string;
  dosageStrength: string;
  routeOfDrugAdministration: string;
  isPrescriptionRequired: boolean;
  unitsPerPack: number;
  manufacturer: string;
  drugClass: string;
  status: string;
}

class DRUGS extends Model<drugsInterface> implements drugsInterface {
  public drugID!: string;
  public genericName!: string;
  public brandName!: string;
  public dosageForm!: string;
  public drugType!: string;
  public dosageStrength!: string;
  public routeOfDrugAdministration!: string;
  public isPrescriptionRequired!: boolean;
  public unitsPerPack!: number;
  public manufacturer!: string;
  public drugClass!: string;
  public status!: string;
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
      type: STRING,
      allowNull: false,
    },
    brandName: {
      type: STRING,
      allowNull: false,
    },
    dosageForm: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "DRUG_DOSAGE_FORM",
        key: "dosageFormID",
      },
    },
    drugType: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "DRUG_TYPES",
        key: "drugTypeID",
      },
    },
    dosageStrength: {
      type: STRING,
      allowNull: false,
    },
    routeOfDrugAdministration: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "ROUTE_OF_DRUG_ADMINISTRATION",
        key: "routeOfDrugAdministrationID",
      },
    },
    isPrescriptionRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    unitsPerPack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "DRUG_MANUFACTURERS",
        key: "manufacturerID",
      },
    },
    drugClass: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "DRUG_CLASS",
        key: "drugClassID",
      },
    },
    status: {
      type: DataTypes.ENUM("Active", "Discontinued", "Out of Stock"),
      allowNull: false,
      defaultValue: "Active",
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
