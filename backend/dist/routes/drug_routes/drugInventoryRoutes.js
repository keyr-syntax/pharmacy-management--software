"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pharmacyUserMiddleware_1 = require("../../middleware/pharmacyUserMiddleware");
const drugInventoryControllers_1 = require("../../controllers/drug_controllers/drugInventoryControllers");
const router = express_1.default.Router();
router.post("/admin/new_drug_inventory", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugInventoryControllers_1.addNewDrugInventory);
router.get("/find_all_inventories", pharmacyUserMiddleware_1.userAuthenticationMiddleware, drugInventoryControllers_1.findAllDrugInventories);
router.put("/admin/update_drug_inventory/:drugInventoryID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugInventoryControllers_1.updateDrugInventory);
router.get("/admin/find_inventory/:drugInventoryID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugInventoryControllers_1.findInventoryByUUID);
router.get("/admin/deleted_drug_inventories", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugInventoryControllers_1.fetchAllDeletedDrugInventory);
router.put("/admin/delete_drug_inventory/:drugInventoryID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugInventoryControllers_1.deleteDrugInventory);
router.put("/admin/restore_deleted_inventory/:drugInventoryID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugInventoryControllers_1.undoDeletedDrugInventory);
exports.default = router;
