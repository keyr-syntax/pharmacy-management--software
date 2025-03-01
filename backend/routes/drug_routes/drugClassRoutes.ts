import express, { Router } from "express";

import {
  adminAuthenticationMiddleware,
  userAuthenticationMiddleware,
} from "../../middleware/pharmacyUserMiddleware";
import {
  addNewDrugClass,
  findAllDrugClass,
  findDrugClassByUUID,
  updateDrugClass,
  deleteDrugClass,
  undoDeletedDrugClass,
  fetchAllDeletedDrugClass,
} from "../../controllers/drug_controllers/drugClassControllers";
const router: Router = express.Router();

router.post(
  "/admin/new_drug_class",
  adminAuthenticationMiddleware,
  addNewDrugClass
);
router.put(
  "/admin/update_drug_class/:drugClassID",
  adminAuthenticationMiddleware,
  updateDrugClass
);
router.put(
  "/admin/restore_deleted_drug_class/:drugClassID",
  adminAuthenticationMiddleware,
  undoDeletedDrugClass
);

router.get(
  "/find_all_drug_class",
  userAuthenticationMiddleware,
  findAllDrugClass
);

router.get(
  "/admin/drug_class/:drugClassID",
  adminAuthenticationMiddleware,
  findDrugClassByUUID
);

router.get(
  "/admin/deleted_drug_class",
  adminAuthenticationMiddleware,
  fetchAllDeletedDrugClass
);
router.delete(
  "/admin/delete_drug_class/:drugClassID",
  adminAuthenticationMiddleware,
  deleteDrugClass
);

export default router;
