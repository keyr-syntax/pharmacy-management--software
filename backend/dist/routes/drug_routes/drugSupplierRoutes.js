"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pharmacyUserMiddleware_1 = require("../../middleware/pharmacyUserMiddleware");
const drugSupplierControllers_1 = require("../../controllers/drug_controllers/drugSupplierControllers");
const router = express_1.default.Router();
router.post("/admin/new_drug_supplier", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugSupplierControllers_1.addNewDrugSupplier);
router.put("/admin/update_drug_supplier/:supplierID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugSupplierControllers_1.updateDrugSupplier);
router.put("/admin/restore_deleted_drug_supplier/:supplierID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugSupplierControllers_1.undoDeletedDrugSupplier);
router.get("/find_all_drug_suppliers", pharmacyUserMiddleware_1.userAuthenticationMiddleware, drugSupplierControllers_1.findAllDrugSuppliers);
router.get("/admin/find_drug_supplier/:supplierID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugSupplierControllers_1.findSupplierByUUID);
router.get("/admin/deleted_drug_supplier", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugSupplierControllers_1.fetchAllDeletedDrugSuppliers);
router.put("/admin/delete_drug_supplier/:supplierID", pharmacyUserMiddleware_1.adminAuthenticationMiddleware, drugSupplierControllers_1.deleteDrugSupplier);
exports.default = router;
