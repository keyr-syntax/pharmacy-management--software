import { DataTypes, Model, STRING } from "sequelize";
import { sequelize } from "../config/dbMySQLconfig";

export interface drugsDosageFormInterface {
  dosageFormID: string;
  dosageForm: string;
}

class DRUG_DOSAGE_FORM
  extends Model<drugsDosageFormInterface>
  implements drugsDosageFormInterface
{
  public dosageFormID!: string;
  public dosageForm!: string;
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
      type: STRING,
      allowNull: false,
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
