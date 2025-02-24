import express, { Router } from "express";
import {
  createPharmacyUser,
  loginPharmacyUser,
  logoutUser,
  updateUserProfile,
  fetchAllPharmacyUsers,
  updatePharmacyUserProfileByAdmin,
  fetchOneUserByID,
  deletePharmacyUser,
} from "../controllers/pharmacyUserControllers";
import {
  adminAuthenticationMiddleware,
  userAuthenticationMiddleware,
} from "../middleware/pharmacyUserMiddleware";
const router: Router = express.Router();

router.post("/create_user", createPharmacyUser);
router.post("/login", loginPharmacyUser);
router.get("/logout", userAuthenticationMiddleware, logoutUser);
router.delete(
  "/admin/delete_user/:userID",
  adminAuthenticationMiddleware,
  deletePharmacyUser
);
router.put(
  "/admin/update_user_profile/:userID",
  adminAuthenticationMiddleware,
  updatePharmacyUserProfileByAdmin
);

router.get(
  "/admin/fetch_all_users",
  adminAuthenticationMiddleware,
  fetchAllPharmacyUsers
);

router.put(
  "/update_user_profile/:userID",
  userAuthenticationMiddleware,
  updateUserProfile
);

router.get(
  "/admin/fetch_user_byid/:userID",
  adminAuthenticationMiddleware,
  fetchOneUserByID
);
export default router;
