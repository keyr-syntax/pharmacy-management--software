import express, { Router } from "express";

import {
  adminAuthenticationMiddleware,
  userAuthenticationMiddleware,
} from "../middleware/pharmacyUserMiddleware";

<<<<<<< HEAD
import {
  addNewDrugManufacturer,
  findAllDrugManufacturers,
  findDrugManufacturerByUUID,
  updateDrugManufacturer,
  deleteDrugManufacturer,
  undoDeletedDrugManufacturer,
  fetchAllDeletedDrugManufacturers,
=======
import {addNewDrugManufacturer, findAllDrugManufacturers, findDrugManufacturerByUUID, updateDrugManufacturer, deleteDrugManufacturer, undoDeletedDrugManufacturer, fetchAllDeletedDrugManufacturers
  
>>>>>>> 27aca0e7054af98b2698bcf3405eb6155e4cd127
} from "../controllers/drugManufacturerControllers";
const router: Router = express.Router();

router.post(
  "/admin/new_drug_manufacturer",
  adminAuthenticationMiddleware,
  addNewDrugManufacturer
);
router.put(
<<<<<<< HEAD
  "/admin/update_drug_manufacturer/:manufacturerID",
=======
  "/admin/update_drug_manufacturer"/:manufacturerID",
>>>>>>> 27aca0e7054af98b2698bcf3405eb6155e4cd127
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
<<<<<<< HEAD
  "/admin/find_drug_manufacturer/:manufacturerID",
=======
  "/admin/find_drug_manufacturer"/:manufacturerID",
>>>>>>> 27aca0e7054af98b2698bcf3405eb6155e4cd127
  adminAuthenticationMiddleware,
  findDrugManufacturerByUUID
);
router.get(
  "/admin/deleted_drug_manufacturers",
  adminAuthenticationMiddleware,
  fetchAllDeletedDrugManufacturers
);
router.delete(
  "/admin/delete_drug_manufacturer/:manufacturerID",
  adminAuthenticationMiddleware,
  deleteDrugManufacturer
);

export default router;
