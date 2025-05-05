import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/dbMySQLconfig";

export interface drugInventoryInterface {
  drugInventoryID?: string;
  drugID: string;
  batchNumber: string;
  barCode: string;
  storageConditions: string;
  location: string;
  expiryDate: Date;
  hasProductExpired: boolean;
  isProductExpiryNotified: boolean;
  quantityInStock: number;
  minimumQuantityInStock: number;
  reorderStockLevel: number;
  softDeleted: boolean;
}

class DRUG_INVENTORY
  extends Model<drugInventoryInterface>
  implements drugInventoryInterface
{
  public drugInventoryID!: string;
  public drugID!: string;
  public batchNumber!: string;
  public barCode!: string;
  public storageConditions!: string;
  public location!: string;
  public expiryDate!: Date;
  public hasProductExpired!: boolean;
  public isProductExpiryNotified!: boolean;
  public quantityInStock!: number;
  public minimumQuantityInStock!: number;
  public reorderStockLevel!: number;
  public softDeleted!: boolean;
}

DRUG_INVENTORY.init(
  {
    drugInventoryID: {
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
    batchNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storageConditions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    barCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    quantityInStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minimumQuantityInStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reorderStockLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hasProductExpired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isProductExpiryNotified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    softDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "DRUG_INVENTORY",
    tableName: "DRUG_INVENTORY",
    timestamps: true,
  }
);

export default DRUG_INVENTORY;
