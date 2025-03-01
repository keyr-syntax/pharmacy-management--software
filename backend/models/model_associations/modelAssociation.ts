import DRUGS from "../drug_model/drugsModel";
import DRUG_MANUFACTURERS from "../drug_model/drugManufacturersModel";

const modelAssociation = () => {
  DRUGS.belongsTo(DRUG_MANUFACTURERS, {
    foreignKey: "manufacturerID",
    as: "manufacturer_name",
  });
  DRUG_MANUFACTURERS.hasMany(DRUGS, {
    foreignKey: "manufacturerID",
    as: "drugs",
  });
};

export default modelAssociation;
