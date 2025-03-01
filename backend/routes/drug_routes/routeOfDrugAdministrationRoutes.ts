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
  updateRouteOfDrugAdministration
);
router.put(
  "/admin/restore_route_of_drug_administration/:routeOfDrugAdministrationID",
  adminAuthenticationMiddleware,
  undoDeletedRouteOfDrugAdministration
);
router.get(
  "/find_all_route_of_drug_administration",
  userAuthenticationMiddleware,
  findAllRoutesOfDrugAdministration
);

router.get(
  "/admin/routeOfDrugAdministration/:routeOfDrugAdministrationID",
  adminAuthenticationMiddleware,
  findRouteOfDrugAdministrationByUUID
);
router.get(
  "/admin/find_all_deleted_route_of_drug_administration",
  adminAuthenticationMiddleware,
  fetchAllDeletedRouteOfDrugAdministration
);
router.delete(
  "/admin/delete_route_of_drug_administration/:routeOfDrugAdministrationID",
  adminAuthenticationMiddleware,
  deleteRouteOfDrugAdministration
);

export default router;
