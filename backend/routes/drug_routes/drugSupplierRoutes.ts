import express, { Router } from "express";

import {
  adminAuthenticationMiddleware,
  userAuthenticationMiddleware,
} from "../../middleware/pharmacyUserMiddleware";

import {
  addNewDrugSupplier,
  findAllDrugSuppliers,
  findSupplierByUUID,
  updateDrugSupplier,
  deleteDrugSupplier,
  undoDeletedDrugSupplier,
  fetchAllDeletedDrugSuppliers,
} from "../../controllers/drug_controllers/drugSupplierControllers";
const router: Router = express.Router();

router.post(
  "/admin/new_drug_supplier",
  adminAuthenticationMiddleware,
  addNewDrugSupplier
);

router.put(
  "/admin/update_drug_supplier/:supplierID",
  adminAuthenticationMiddleware,
  updateDrugSupplier
);

router.put(
  "/admin/restore_deleted_drug_supplier/:supplierID",
  adminAuthenticationMiddleware,
  undoDeletedDrugSupplier
);

router.get(
  "/find_all_drug_suppliers",
  userAuthenticationMiddleware,
  findAllDrugSuppliers
);

router.get(
  "/admin/find_drug_supplier/:supplierID",
  adminAuthenticationMiddleware,
  findSupplierByUUID
);

router.get(
  "/admin/deleted_drug_supplier",
  adminAuthenticationMiddleware,
  fetchAllDeletedDrugSuppliers
);

router.put(
  "/admin/delete_drug_supplier/:supplierID",
  adminAuthenticationMiddleware,
  deleteDrugSupplier
);

export default router;
