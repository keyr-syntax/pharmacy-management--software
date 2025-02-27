import DRUG_DOSAGE_FORM from "./dosageFormModel";
import DRUGS from "./drugsModel";
import DRUG_TYPES from "./drugTypeModel";
import ROUTE_OF_DRUG_ADMINISTRATION from "./routeOfDrugAdministrationModel";
import DRUG_MANUFACTURERS from "./drugManufacturersModel";
import DRUG_CLASS from "./drugClassModel";

const modelAssociation = () => {
  DRUGS.belongsTo(DRUG_DOSAGE_FORM, {
    foreignKey: "dosageFormID",
    as: "dosage_form",
  });
  DRUG_DOSAGE_FORM.hasMany(DRUGS, {
    foreignKey: "dosageFormID",
    as: "drugs",
  });
  DRUGS.belongsTo(DRUG_TYPES, {
    foreignKey: "drugTypeID",
    as: "drug_type",
  });
  DRUG_TYPES.hasMany(DRUGS, {
    foreignKey: "drugTypeID",
    as: "drugs",
  });
  DRUGS.belongsTo(ROUTE_OF_DRUG_ADMINISTRATION, {
    foreignKey: "routeOfDrugAdministrationID",
    as: "route_of_drug_administration",
  });
  ROUTE_OF_DRUG_ADMINISTRATION.hasMany(DRUGS, {
    foreignKey: "routeOfDrugAdministrationID",
    as: "drugs",
  });
  DRUGS.belongsTo(DRUG_MANUFACTURERS, {
    foreignKey: "manufacturerID",
    as: "manufacturer_name",
  });
  DRUG_MANUFACTURERS.hasMany(DRUGS, {
    foreignKey: "manufacturerID",
    as: "drugs",
  });
  DRUGS.belongsTo(DRUG_CLASS, {
    foreignKey: "drugClassID",
    as: "drug_class",
  });
  DRUG_CLASS.hasMany(DRUGS, {
    foreignKey: "drugClassID",
    as: "drugs",
  });
};

export default modelAssociation;
