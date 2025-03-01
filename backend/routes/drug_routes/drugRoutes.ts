import express, { Router } from "express";

import {
  adminAuthenticationMiddleware,
  userAuthenticationMiddleware,
} from "../../middleware/pharmacyUserMiddleware";

import {
  addNewDrug,
  findDrugByUUID,
  updateDrugDetails,
  findAllDrugs,
} from "../../controllers/drug_controllers/drugsControllers";

const router: Router = express.Router();

router.post("/admin/new_drug", adminAuthenticationMiddleware, addNewDrug);
router.get(
  "/find_drug_by_ID/:drugID",
  userAuthenticationMiddleware,
  findDrugByUUID
);
router.get("/find_all_drugs", userAuthenticationMiddleware, findAllDrugs);
router.put(
  "/admin/update_drug_details/:drugID",
  adminAuthenticationMiddleware,
  updateDrugDetails
);
export default router;
