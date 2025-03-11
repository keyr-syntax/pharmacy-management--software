"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pharmacyUserMiddleware_1 = require("../../middleware/pharmacyUserMiddleware");
const drugsControllers_1 = require("../../controllers/drug_controllers/drugsControllers");
const router = express_1.default.Router();
router.post("/admin/new_drug", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugsControllers_1.addNewDrug);
router.get("/find_drug_by_ID/:drugID", pharmacyUserMiddleware_1.userAuthenticationMiddleware, drugsControllers_1.findDrugByUUID);
router.get("/find_all_drugs", pharmacyUserMiddleware_1.userAuthenticationMiddleware, drugsControllers_1.findAllDrugs);
router.put("/admin/update_drug_details/:drugID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugsControllers_1.updateDrugDetails);
router.put("/admin/delete_drug/:drugID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugsControllers_1.deleteDrug);
router.put("/admin/restore_deleted_drug/:drugID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugsControllers_1.undoDeletedDrug);
router.get("/admin/find_all_deleted_drugs", pharmacyUserMiddleware_1.userAuthenticationMiddleware, drugsControllers_1.fetchAllDeletedDrugs);
exports.default = router;
