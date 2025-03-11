"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const drugsModel_1 = __importDefault(require("../drug_model/drugsModel"));
const drugInventory_1 = __importDefault(require("../drug_model/drugInventory"));
const drugPricingModel_1 = __importDefault(require("../drug_model/drugPricingModel"));
const drugSafetyModel_1 = __importDefault(require("../drug_model/drugSafetyModel"));
const drugSupplierModel_1 = __importDefault(require("../drug_model/drugSupplierModel"));
const modelAssociation = () => {
    try {
        drugsModel_1.default.hasMany(drugInventory_1.default, {
            foreignKey: "drugID",
            as: "inventory",
        });
        drugInventory_1.default.belongsTo(drugsModel_1.default, {
            foreignKey: "drugID",
            as: "drug",
        });
        drugsModel_1.default.hasOne(drugPricingModel_1.default, {
            foreignKey: "drugID",
            as: "pricing",
        });
        drugPricingModel_1.default.belongsTo(drugsModel_1.default, {
            foreignKey: "drugID",
            as: "drug",
        });
        drugsModel_1.default.hasOne(drugSafetyModel_1.default, {
            foreignKey: "drugID",
            as: "drug_safety",
        });
        drugSafetyModel_1.default.belongsTo(drugsModel_1.default, {
            foreignKey: "drugID",
            as: "drug",
        });
        drugsModel_1.default.hasOne(drugSupplierModel_1.default, {
            foreignKey: "supplierID",
            as: "supplier",
        });
        drugSupplierModel_1.default.belongsTo(drugsModel_1.default, {
            foreignKey: "supplierID",
            as: "drug",
        });
    }
    catch (error) {
        console.log("Error while creating model association", error);
    }
};
exports.default = modelAssociation;
