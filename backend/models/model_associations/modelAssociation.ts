import DRUGS from "../drug_model/drugsModel";
import DRUG_MANUFACTURERS from "../drug_model/drugManufacturersModel";

const modelAssociation = () => {
  try {
    DRUGS.belongsTo(DRUG_MANUFACTURERS, {
      foreignKey: "manufacturerID",
      as: "manufacturer",
    });
    DRUG_MANUFACTURERS.hasMany(DRUGS, {
      foreignKey: "manufacturerID",
      as: "drugs",
    });
  } catch (error) {
    console.log("Error while creating model association", error);
  }
};

export default modelAssociation;
