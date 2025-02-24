import express, { Router } from "express";
import {
  createPharmacyUser,
  loginPharmacyUser,
  logoutUser,
  updateUserProfile,
  fetchAllPharmacyUsers,
  updatePharmacyUserProfileByAdmin,
  fetchOneUserByID,
} from "../controllers/pharmacyUserControllers";
import {
  adminAuthenticationMiddleware,
  userAuthenticationMiddleware,
} from "../middleware/pharmacyUserMiddleware";
const router: Router = express.Router();

router.post("/create_user", createPharmacyUser);
router.post("/login", loginPharmacyUser);
router.get("/logout", userAuthenticationMiddleware, logoutUser);

router.put(
  "/admin/update_user_profile/:userID",
  adminAuthenticationMiddleware,
  updatePharmacyUserProfileByAdmin
);

router.put(
  "/update_user_profile",
  userAuthenticationMiddleware,
  updateUserProfile
);

router.get(
  "/admin/fetch_all_users",
  adminAuthenticationMiddleware,
  fetchAllPharmacyUsers
);

router.get(
  "/admin/fetch_user_byid/:userID",
  adminAuthenticationMiddleware,
  fetchOneUserByID
);

router.get(
  "/fetch_user_byid/:userID",
  userAuthenticationMiddleware,
  fetchOneUserByID
);


export default router;
