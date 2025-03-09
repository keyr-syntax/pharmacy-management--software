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
  fetchAllDeletedDrugInventory,
  deleteDrugInventory,
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
  "/admin/find_inventory/:drugInventoryID",
  adminAuthenticationMiddleware,
  findInventoryByUUID
);

router.get(
  "/admin/deleted_drug_inventories",
  adminAuthenticationMiddleware,
  fetchAllDeletedDrugInventory
);

router.put(
  "/admin/delete_drug_inventory/:drugInventoryID",
  adminAuthenticationMiddleware,
  deleteDrugInventory
);

router.put(
  "/admin/restore_deleted_inventory/:drugInventoryID",
  adminAuthenticationMiddleware,
  undoDeletedDrugInventory
);
export default router;
