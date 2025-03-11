"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pharmacyUserMiddleware_1 = require("../../middleware/pharmacyUserMiddleware");
const productConstantsControllers_1 = require("../../controllers/product_constant_controllers/productConstantsControllers");
const router = express_1.default.Router();
router.get("/dosage_forms", pharmacyUserMiddleware_1.userAuthenticationMiddleware, productConstantsControllers_1.fetchDosageForms);
router.get("/drug_classes", pharmacyUserMiddleware_1.userAuthenticationMiddleware, productConstantsControllers_1.fetchDrugClasses);
router.get("/routes_of_drug_administration", pharmacyUserMiddleware_1.userAuthenticationMiddleware, productConstantsControllers_1.fetchRoutesOfDrugAdministration);
router.get("/storage_conditions", pharmacyUserMiddleware_1.userAuthenticationMiddleware, productConstantsControllers_1.fetchStorageConditions);
exports.default = router;
