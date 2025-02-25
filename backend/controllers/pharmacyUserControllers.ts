import pharmacyUser from "../models/pharmacyUserModel";
import { Request, Response } from "express";
import validator from "validator";
import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { pharmacyUserInterface } from "../models/pharmacyUserModel";

dotenv.config();

const opts = {
  jwtFromRequest: (req: Request) => {
    return req.cookies ? req.cookies.pharmacyApp : null;
  },
  secretOrKey: process.env.TOKEN_SECRET!,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await pharmacyUser.findByPk(jwtPayload.id);
      return user ? done(null, user) : done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export const createPharmacyUser = async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  const { firstName, lastName, email, password, phoneNumber, role, isBlocked } =
    req.body;

  if (
    !firstName ||
    firstName.trim() === "" ||
    !lastName ||
    lastName.trim() === "" ||
    !email ||
    email.trim() === "" ||
    !password ||
    password.trim() === "" ||
    !phoneNumber ||
    !role ||
    role.trim() === "" ||
    !isBlocked ||
    isBlocked.trim() === ""
  ) {
    res.json({ success: false, message: "All fields are required" });
    return;
  }
  if (!validator.isEmail(email)) {
    res.json({ success: false, message: "Email is not valid" });
    return;
  }

  try {
    const checkIfUserExists = await pharmacyUser.findOne({
      where: { email: email },
    });

    if (checkIfUserExists) {
      res.json({
        success: false,
        message: "You already have an account, please login",
      });
      return;
    }
    const newUser = await pharmacyUser.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
      isBlocked,
      SoftDeleted: false,
    });

    if (newUser) {
      const token = jwt.sign({ id: newUser.id }, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });

      res.cookie("pharmacyApp", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        success: true,
        message: "Signup Successful!",
        user: newUser,
      });
      return;
    } else {
      res.status(400).json({
        success: false,
        message: "Signup failed",
      });
      return;
    }
  } catch (error) {
    console.log("Error while registering user", error);
    res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
};
export const loginPharmacyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const checkIfUserExists = await pharmacyUser.findOne({
      where: {
        email: email,
      },
    });

    if (!checkIfUserExists) {
      res.status(404).json({
        success: false,
        message: "User does not exist. Please Register",
      });
      return;
    } else if (!(await bcrypt.compare(password, checkIfUserExists.password))) {
      res.status(404).json({
        success: false,
        message: "Password is incorrect",
      });
      return;
    } else if (checkIfUserExists.isBlocked === "Blocked") {
      res.status(404).json({
        success: false,
        message: "Access denied! You are blocked!",
      });
      return;
    } else if (checkIfUserExists.SoftDeleted) {
      res.status(404).json({
        success: false,
        message:
          "This account has been deleted. Contact admin for account recovery",
      });
      return;
    } else {
      const token = jwt.sign(
        { id: checkIfUserExists.id },
        process.env.TOKEN_SECRET!,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("pharmacyApp", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Login Successful!",
        user: checkIfUserExists,
      });
      return;
    }
  } catch (error) {
    console.log("Error during user Login", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};
export const updatePharmacyUserProfileByAdmin = async (
  req: Request,
  res: Response
) => {
  const { userID } = req.params;
  const { firstName, lastName, email, phoneNumber, role, isBlocked } = req.body;

  try {
    const findPharmacyUserByID = await pharmacyUser.findByPk(userID);

    if (findPharmacyUserByID && !findPharmacyUserByID.SoftDeleted) {
      const updatePharmacyUser = await findPharmacyUserByID.update({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        role: role,
        isBlocked: isBlocked,
      });

      if (updatePharmacyUser) {
        const findAllUsers = await pharmacyUser.findAll({
          order: [["createdAt", "DESC"]],
        });
        res.status(200).json({
          success: true,
          message: "Profile updated successfully",
          users: findAllUsers,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Profile update failed",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while updating user profile", error);
    res.status(500).json({
      success: false,
      message: "Profile update failed",
    });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phoneNumber, role } = req.body;
  const user: pharmacyUserInterface | undefined =
    req.user as pharmacyUserInterface;
  if (!user) {
    res.status(401).json({ success: false, message: "Access denied!" });
    return;
  }
  try {
    const findPharmacyUserByID = await pharmacyUser.findByPk(user.id);

    if (findPharmacyUserByID && !findPharmacyUserByID.SoftDeleted) {
      const updatePharmacyUser = await findPharmacyUserByID.update({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        role: role,
      });

      if (updatePharmacyUser) {
        res.status(200).json({
          success: true,
          message: "Profile updated successfully",
          user: updatePharmacyUser,
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Profile update failed",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while updating user profile");
    res.status(500).json({
      success: false,
      message: "Profile update failed",
    });
  }
};
export const logoutUser = (req: Request, res: Response) => {
  try {
    res.clearCookie("pharmacyApp", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log("Error during logout", error);
    res.status(500).json({
      success: false,
      message: "Error during logout",
    });
  }
};
export const fetchAllPharmacyUsers = async (req: Request, res: Response) => {
  try {
    const findAllUsers = await pharmacyUser.findAll({
      where: {
        SoftDeleted: false,
      },
      order: [["createdAt", "DESC"]],
    });

    if (findAllUsers.length > 0) {
      res.status(200).json({
        success: true,
        users: findAllUsers,
      });
      return;
    } else {
      res.status(200).json({
        success: true,
        users: [],
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

export const fetchOneUserByID = async (req: Request, res: Response) => {
  const { userID } = req.params;
  try {
    const findUserByPK = await pharmacyUser.findByPk(userID);

    if (findUserByPK && !findUserByPK.SoftDeleted) {
      res.status(200).json({
        success: true,
        user: findUserByPK,
      });
      return;
    } else {
      res.status(200).json({
        success: false,
        message: "User not found",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userID } = req.params;

  try {
    const findPharmacyUserByID = await pharmacyUser.findByPk(userID);

    if (findPharmacyUserByID && !findPharmacyUserByID.SoftDeleted) {
      const softDeletePharmacyUser = await findPharmacyUserByID.update({
        SoftDeleted: true,
      });

      if (softDeletePharmacyUser) {
        const findAllUsers = await pharmacyUser.findAll({
          where: {
            SoftDeleted: false,
          },
          order: [["createdAt", "DESC"]],
        });
        res.status(200).json({
          success: true,
          message: "Deleted",
          users: findAllUsers,
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Failed to delete user",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while deleting user");
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};
