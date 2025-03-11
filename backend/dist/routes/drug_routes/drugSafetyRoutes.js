"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pharmacyUserMiddleware_1 = require("../../middleware/pharmacyUserMiddleware");
const drugSafetyControllers_1 = require("../../controllers/drug_controllers/drugSafetyControllers");
const router = express_1.default.Router();
router.post("/admin/new_drug_safety", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugSafetyControllers_1.addNewDrugSafety);
router.get("/find_all_safety", pharmacyUserMiddleware_1.userAuthenticationMiddleware, drugSafetyControllers_1.findAllDrugSafety);
router.put("/admin/update_drug_safety/:safetyID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugSafetyControllers_1.updateDrugSafety);
router.get("/admin/find_safety/:safetyID/:drugID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugSafetyControllers_1.findSafetyByUUID);
router.get("/admin/deleted_drug_safety", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugSafetyControllers_1.fetchAllDeletedDrugSafety);
router.put("/admin/delete_drug_safety/:safetyID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugSafetyControllers_1.deleteDrugSafety);
router.put("/admin/restore_deleted_safety/:safetyID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugSafetyControllers_1.undoDeletedDrugSafety);
exports.default = router;
