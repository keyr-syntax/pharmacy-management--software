import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/dbMySQLconfig";

export interface drugsDosageFormInterface {
  dosageFormID?: string;
  dosageForm: string;
  softDeleted: boolean;
}

class DRUG_DOSAGE_FORM
  extends Model<drugsDosageFormInterface>
  implements drugsDosageFormInterface
{
  public dosageFormID!: string;
  public dosageForm!: string;
  public softDeleted!: boolean;
}

DRUG_DOSAGE_FORM.init(
  {
    dosageFormID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    dosageForm: {
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
    modelName: "DRUG_DOSAGE_FORM",
    tableName: "DRUG_DOSAGE_FORM",
    timestamps: true,
  }
);

export default DRUG_DOSAGE_FORM;
