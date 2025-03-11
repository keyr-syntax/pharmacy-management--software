"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pharmacyUserMiddleware_1 = require("../../middleware/pharmacyUserMiddleware");
const drugPricingController_1 = require("../../controllers/drug_controllers/drugPricingController");
const router = express_1.default.Router();
router.post("/admin/new_drug_pricing", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugPricingController_1.addNewDrugPricing);
router.get("/find_all_pricings", pharmacyUserMiddleware_1.userAuthenticationMiddleware, drugPricingController_1.findAllDrugPricing);
router.put("/admin/update_drug_pricing/:pricingID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugPricingController_1.updateDrugPricing);
router.get("/admin/find_pricing/:pricingID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugPricingController_1.findPricingByUUID);
router.get("/admin/deleted_drug_pricing", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugPricingController_1.fetchAllDeletedDrugPricing);
router.put("/admin/delete_drug_pricing/:pricingID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugPricingController_1.deleteDrugPricing);
router.put("/admin/restore_deleted_pricing/:pricingID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugPricingController_1.undoDeletedDrugPricing);
exports.default = router;
