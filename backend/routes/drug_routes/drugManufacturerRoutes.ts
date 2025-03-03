import express, { Router } from "express";

import {
  adminAuthenticationMiddleware,
  userAuthenticationMiddleware,
} from "../../middleware/pharmacyUserMiddleware";

import {
  addNewDrugManufacturer,
  findAllDrugManufacturers,
  findDrugManufacturerByUUID,
  updateDrugManufacturer,
  deleteDrugManufacturer,
  undoDeletedDrugManufacturer,
  fetchAllDeletedDrugManufacturers,
} from "../../controllers/drug_controllers/drugManufacturerControllers";
const router: Router = express.Router();

router.post(
  "/admin/new_drug_manufacturer",
  adminAuthenticationMiddleware,
  addNewDrugManufacturer
);
router.put(
  "/admin/update_drug_manufacturer/:manufacturerID",
  adminAuthenticationMiddleware,
  updateDrugManufacturer
);
router.put(
  "/admin/restore_deleted_drug_manufacturer/:manufacturerID",
  adminAuthenticationMiddleware,
  undoDeletedDrugManufacturer
);
router.get(
  "/find_all_drug_manufacturers",
  userAuthenticationMiddleware,
  findAllDrugManufacturers
);

router.get(
  "/admin/find_drug_manufacturer/:manufacturerID",
  adminAuthenticationMiddleware,
  findDrugManufacturerByUUID
);
router.get(
  "/admin/deleted_drug_manufacturers",
  adminAuthenticationMiddleware,
  fetchAllDeletedDrugManufacturers
);
router.put(
  "/admin/delete_drug_manufacturer/:manufacturerID",
  adminAuthenticationMiddleware,
  deleteDrugManufacturer
);

export default router;
