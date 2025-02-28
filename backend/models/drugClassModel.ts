import { DataTypes, Model, STRING } from "sequelize";
import { sequelize } from "../config/dbMySQLconfig";

export interface drugClassInterface {
  drugClassID?: string;
  drugClass: string;
<<<<<<< HEAD
  softDeleted: boolean;
=======
softDeleted: boolean;
>>>>>>> 27aca0e7054af98b2698bcf3405eb6155e4cd127
}

class DRUG_CLASS
  extends Model<drugClassInterface>
  implements drugClassInterface
{
  public drugClassID!: string;
  public drugClass!: string;
<<<<<<< HEAD
  public softDeleted!: boolean;
=======
public softDeleted!: boolean;
>>>>>>> 27aca0e7054af98b2698bcf3405eb6155e4cd127
}

DRUG_CLASS.init(
  {
    drugClassID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    drugClass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
<<<<<<< HEAD
    softDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
=======
softDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
defaultValue:false,
>>>>>>> 27aca0e7054af98b2698bcf3405eb6155e4cd127
    },
  },
  {
    sequelize,
    modelName: "DRUG_CLASS",
    tableName: "DRUG_CLASS",
    timestamps: true,
  }
);

export default DRUG_CLASS;
