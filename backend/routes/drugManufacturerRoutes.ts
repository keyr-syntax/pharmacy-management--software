import express, { Router } from "express";

import {
  adminAuthenticationMiddleware,
  userAuthenticationMiddleware,
} from "../middleware/pharmacyUserMiddleware";

import {addNewDrugManufacturer, findAllDrugManufacturers, findDrugManufacturerByUUID, updateDrugManufacturer, deleteDrugManufacturer, undoDeletedDrugManufacturer, fetchAllDeletedDrugManufacturers
  
} from "../controllers/drugManufacturerControllers";
const router: Router = express.Router();

router.post(
  "/admin/new_drug_manufacturer",
  adminAuthenticationMiddleware,
  addNewDrugManufacturer
);
router.put(
  "/admin/update_drug_manufacturer"/:ID",
  adminAuthenticationMiddleware,
  updateDosageForm
);
router.put(
  "/admin/restore_dosage_form/:dosageFormID",
  adminAuthenticationMiddleware,
  undoDeletedDosageForm
);
router.get(
  "/find_all_dosage_forms",
  userAuthenticationMiddleware,
  findAllDrugDosageForms
);

router.get(
  "/admin/find_all_dosage_forms/:dosageFormID",
  adminAuthenticationMiddleware,
  findDosageFormByUUID
);
router.get(
  "/admin/deleted_dosage_forms",
  adminAuthenticationMiddleware,
  fetchAllDeletedDosageForms
);
router.delete(
  "/admin/delete_dosage_form/:dosageFormID",
  adminAuthenticationMiddleware,
  deleteDosageForm
);

export default router;
