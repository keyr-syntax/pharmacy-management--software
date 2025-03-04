import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/dbMySQLconfig";

export interface drugPricingInterface {
  pricingID?: string;
  drugID: string;
  purchasePrice: number;
  sellingPrice: number;
  taxRate: number;
  margin?: number;
  insuranceCoverage?: boolean;
}

class DRUG_PRICING
  extends Model<drugPricingInterface>
  implements drugPricingInterface
{
  public pricingID!: string;
  public drugID!: string;
  public purchasePrice!: number;
  public sellingPrice!: number;
  public taxRate!: number;
  public margin?: number;
  public insuranceCoverage?: boolean;
}

DRUG_PRICING.init(
  {
    pricingID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    drugID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'DRUGS',
        key: 'drugID',
      },
    },
    purchasePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    sellingPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    taxRate: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    margin: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    insuranceCoverage: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "DRUG_PRICING",
    tableName: "DRUG_PRICING",
    timestamps: true,
  }
);

export default DRUG_PRICING;