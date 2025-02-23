import express, { Router } from "express";
import {
  createPharmacyUser,
  loginPharmacyUser,
  logoutUser,
  updateUserProfile,
  fetchAllPharmacyUsers,
  updatePharmacyUserProfileByAdmin,
} from "../controllers/pharmacyUserControllers";
import {
  adminAuthenticationMiddleware,
  userAuthenticationMiddleware,
} from "../middleware/pharmacyUserMiddleware";
const router: Router = express.Router();

router.post("/create_user", createPharmacyUser);
router.post("/login", loginPharmacyUser);
router.get("/logout", userAuthenticationMiddleware, logoutUser);
router.put("/update_profile", userAuthenticationMiddleware, updateUserProfile);
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
export default router;
