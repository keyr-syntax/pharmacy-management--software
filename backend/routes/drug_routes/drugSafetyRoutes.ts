import express, { Router } from "express";

import {
  adminAuthenticationMiddleware,
  userAuthenticationMiddleware,
} from "../../middleware/pharmacyUserMiddleware";
import {
  addNewDrugSafety,
  findAllDrugSafety,
  findSafetyByUUID,
  updateDrugSafety,
  undoDeletedDrugSafety,
  fetchAllDeletedDrugSafety,
  deleteDrugSafety,
} from "../../controllers/drug_controllers/drugSafetyControllers";

const router: Router = express.Router();

router.post(
  "/admin/new_drug_safety",
  adminAuthenticationMiddleware,
  addNewDrugSafety
);
router.get("/find_all_safety", userAuthenticationMiddleware, findAllDrugSafety);
router.put(
  "/admin/update_drug_safety/:safetyID",
  adminAuthenticationMiddleware,
  updateDrugSafety
);

router.get(
  "/admin/find_safety/:safetyID/:drugID",
  adminAuthenticationMiddleware,
  findSafetyByUUID
);

router.get(
  "/admin/deleted_drug_safety",
  adminAuthenticationMiddleware,
  fetchAllDeletedDrugSafety
);

router.put(
  "/admin/delete_drug_safety/:safetyID",
  adminAuthenticationMiddleware,
  deleteDrugSafety
);

router.put(
  "/admin/restore_deleted_safety/:safetyID",
  adminAuthenticationMiddleware,
  undoDeletedDrugSafety
);

export default router;
