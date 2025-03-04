import DRUGS from "../drug_model/drugsModel";
import DRUG_MANUFACTURERS from "../drug_model/drugManufacturersModel";
import DRUG_INVENTORY from "../drug_model/drugInventory";
import DRUG_PRICING from "../drug_model/drugPricingModel";


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
    DRUGS.hasMany(DRUG_INVENTORY, {
      foreignKey: "drugID",
      as: "inventory",
    });
    DRUG_INVENTORY.belongsTo(DRUGS, {
      foreignKey: "drugID",
      as: "drug",
    });
DRUGS.hasOne(DRUG_PRICING,{
foreignKey: "drugID",
      as: "pricing",
}
);

DRUG_PRICING.belingsTo(DRUGS,{
foreignKey: "drugID",
      as: "drug",
}
);





  } catch (error) {
    console.log("Error while creating model association", error);
  }
};

export default modelAssociation;
