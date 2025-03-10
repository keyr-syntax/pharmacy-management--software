import express, { Router } from "express";

import {
  adminAuthenticationMiddleware,
  userAuthenticationMiddleware,
} from "../../middleware/pharmacyUserMiddleware";
import {
  addNewDrugPricing,
  findAllDrugPricing,
  findPricingByUUID,
  updateDrugPricing,
  undoDeletedDrugPricing,
  fetchAllDeletedDrugPricing,
  deleteDrugPricing,
} from "../../controllers/drug_controllers/drugPricingController";
const router: Router = express.Router();

router.post(
  "/admin/new_drug_pricing",
  adminAuthenticationMiddleware,
  addNewDrugPricing
);
router.get(
  "/find_all_pricings",
  userAuthenticationMiddleware,
  findAllDrugPricing
);
router.put(
  "/admin/update_drug_pricing/:pricingID",
  adminAuthenticationMiddleware,
  updateDrugPricing
);

router.get(
  "/admin/find_pricing/:pricingID",
  adminAuthenticationMiddleware,
  findPricingByUUID
);

router.get(
  "/admin/deleted_drug_pricing",
  adminAuthenticationMiddleware,
  fetchAllDeletedDrugPricing
);

router.put(
  "/admin/delete_drug_pricing/:pricingID",
  adminAuthenticationMiddleware,
  deleteDrugPricing
);

router.put(
  "/admin/restore_deleted_pricing/:pricingID",
  adminAuthenticationMiddleware,
  undoDeletedDrugPricing
);
export default router;
