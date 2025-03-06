import DRUGS from "../drug_model/drugsModel";
import DRUG_INVENTORY from "../drug_model/drugInventory";
import DRUG_PRICING from "../drug_model/drugPricingModel";
import DRUG_SAFETY from "../drug_model/drugSafetyModel";
import DRUG_SUPPLIER from "../drug_model/drugSupplierModel";

const modelAssociation = () => {
  try {
    DRUGS.hasMany(DRUG_INVENTORY, {
      foreignKey: "drugID",
      as: "inventory",
    });
    DRUG_INVENTORY.belongsTo(DRUGS, {
      foreignKey: "drugID",
      as: "drug",
    });
    DRUGS.hasOne(DRUG_PRICING, {
      foreignKey: "drugID",
      as: "pricing",
    });

    DRUG_PRICING.belongsTo(DRUGS, {
      foreignKey: "drugID",
      as: "drug",
    });

    DRUGS.hasOne(DRUG_SAFETY, {
      foreignKey: "drugID",
      as: "drug_safety",
    });

    DRUG_SAFETY.belongsTo(DRUGS, {
      foreignKey: "drugID",
      as: "drug",
    });

    DRUGS.belongsTo(DRUG_SUPPLIER, {
      foreignKey: "supplierID",
      as: "supplier",
    });
    DRUG_SUPPLIER.hasMany(DRUGS, {
      foreignKey: "supplierID",
      as: "drug",
    });
  } catch (error) {
    console.log("Error while creating model association", error);
  }
};

export default modelAssociation;
