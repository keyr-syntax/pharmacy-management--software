import express, { Router } from "express";
import {
  adminAuthenticationMiddleware,
  userAuthenticationMiddleware,
} from "../../middleware/pharmacyUserMiddleware";
import {
  fetchDosageForms,
  fetchDrugClasses,
  fetchRoutesOfDrugAdministration,
  fetchStorageConditions,
} from "../../controllers/product_constant_controllers/productConstantsControllers";

const router: Router = express.Router();

router.get("/dosage_forms", userAuthenticationMiddleware, fetchDosageForms);
router.get("/drug_classes", userAuthenticationMiddleware, fetchDrugClasses);
router.get(
  "/routes_of_drug_administration",
  userAuthenticationMiddleware,
  fetchRoutesOfDrugAdministration
);
router.get(
  "/storage_conditions",
  userAuthenticationMiddleware,
  fetchStorageConditions
);

export default router;
