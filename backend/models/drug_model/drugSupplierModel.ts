import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/dbMySQLconfig";

export interface drugSupplierInterface {
  supplierID?: string;
  drugID: string;
  supplierName: string;
  contactPersonName: string;
  supplierEmail: string;
  supplierPhoneNumber: string;
  supplierAddress: string;
  licenseNumber: string;
  softDeleted: boolean;
}

class DRUG_SUPPLIER
  extends Model<drugSupplierInterface>
  implements drugSupplierInterface
{
  public supplierID!: string;
  public drugID!: string;
  public supplierName!: string;
  public contactPersonName!: string;
  public supplierEmail!: string;
  public supplierPhoneNumber!: string;
  public supplierAddress!: string;
  public licenseNumber!: string;
  public softDeleted!: boolean;
}

DRUG_SUPPLIER.init(
  {
    supplierID: {
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
    supplierName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactPersonName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supplierEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supplierPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supplierAddress: {
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
    modelName: "DRUG_SUPPLIER",
    tableName: "DRUG_SUPPLIER",
    timestamps: true,
  }
);

export default DRUG_SUPPLIER;
