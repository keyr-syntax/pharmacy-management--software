import express, { Router } from "express";

import {
  adminAuthenticationMiddleware,
  userAuthenticationMiddleware,
} from "../../middleware/pharmacyUserMiddleware";
import {
  addNewDrugInventory,
  findAllDrugInventories,
  findInventoryByUUID,
  updateDrugInventory,
  undoDeletedDrugInventory,
} from "../../controllers/drug_controllers/drugInventoryControllers";
const router: Router = express.Router();

router.post(
  "/admin/new_drug_inventory",
  adminAuthenticationMiddleware,
  addNewDrugInventory
);
router.get(
  "/find_all_inventories",
  userAuthenticationMiddleware,
  findAllDrugInventories
);
router.put(
  "/admin/update_drug_inventory/:drugInventoryID",
  adminAuthenticationMiddleware,
  updateDrugInventory
);

router.get(
  "/admin/find_inventory/:drugInventoryID/:drugID",
  adminAuthenticationMiddleware,
  findInventoryByUUID
);
// router.get(
//   "/admin/deleted_dosage_forms",
//   adminAuthenticationMiddleware,
//   fetchAllDeletedDosageForms
// );
// router.put(
//   "/admin/delete_dosage_form/:dosageFormID",
//   adminAuthenticationMiddleware,
//   deleteDosageForm
// );
router.put(
  "/admin/restore_deleted_inventory/:drugInventoryID",
  adminAuthenticationMiddleware,
  undoDeletedDrugInventory
);
export default router;
