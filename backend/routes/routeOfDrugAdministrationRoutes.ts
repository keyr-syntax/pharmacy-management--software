import express, { Router } from "express";

import {
  adminAuthenticationMiddleware,
  userAuthenticationMiddleware,
} from "../middleware/pharmacyUserMiddleware";
import {
  addNewRouteOfDrugAdministration,
  findAllRoutesOfDrugAdministration,
  findRouteOfDrugAdministrationByUUID,
  updateRouteOfDrugAdministration,
  deleteRouteOfDrugAdministration,
  undoDeletedRouteOfDrugAdministration,
  fetchAllDeletedRouteOfDrugAdministration,
} from "../controllers/routeOfDrugAdministrationControllers";
const router: Router = express.Router();

router.post(
  "/admin/new_route_of_drug_administration",
  adminAuthenticationMiddleware,
  addNewRouteOfDrugAdministration
);
router.put(
  "/admin/update_route_of_drug_administration/:routeOfDrugAdministrationID",
  adminAuthenticationMiddleware,
  updateDosageForm
);
router.put(
  "/admin/restore_deleted_dosage_form/:dosageFormID",
  adminAuthenticationMiddleware,
  undoDeletedDosageForm
);
router.get(
  "/find_all_dosage_forms",
  userAuthenticationMiddleware,
  findAllDrugDosageForms
);

router.get(
  "/admin/dosage_form/:dosageFormID",
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
