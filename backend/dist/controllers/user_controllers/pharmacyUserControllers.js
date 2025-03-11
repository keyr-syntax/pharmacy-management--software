"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.undoDeletedUser = exports.deleteUser = exports.fetchOneUserByID = exports.fetchAllDeletedItems = exports.fetchAllPharmacyUsers = exports.logoutUser = exports.updateUserProfile = exports.fetchOneUserByIDForProfileUpdate = exports.updatePharmacyUserProfileByAdmin = exports.loginPharmacyUser = exports.createPharmacyUser = void 0;
const pharmacyUserModel_1 = __importDefault(require("../../models/user_model/pharmacyUserModel"));
const validator_1 = __importDefault(require("validator"));
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const opts = {
    jwtFromRequest: (req) => {
        return req.cookies ? req.cookies.pharmacyApp : null;
    },
    secretOrKey: process.env.TOKEN_SECRET,
};
passport_1.default.use(new passport_jwt_1.Strategy(opts, (jwtPayload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield pharmacyUserModel_1.default.findByPk(jwtPayload.id);
        return user ? done(null, user) : done(null, false);
    }
    catch (error) {
        return done(error, false);
    }
})));
const createPharmacyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.body", req.body);
    const { firstName, lastName, email, password, phoneNumber, role, isBlocked } = req.body;
    if (!firstName ||
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
        isBlocked.trim() === "") {
        res.json({ success: false, message: "All fields are required" });
        return;
    }
    if (!validator_1.default.isEmail(email)) {
        res.json({ success: false, message: "Email is not valid" });
        return;
    }
    try {
        const checkIfUserExists = yield pharmacyUserModel_1.default.findOne({
            where: { email: email },
        });
        if (checkIfUserExists) {
            res.json({
                success: false,
                message: "You already have an account, please login",
            });
            return;
        }
        const newUser = yield pharmacyUserModel_1.default.create({
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
            const token = jsonwebtoken_1.default.sign({ id: newUser.id }, process.env.TOKEN_SECRET, {
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
        }
        else {
            res.status(400).json({
                success: false,
                message: "Signup failed",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while registering user", error);
        res.status(500).json({
            success: false,
            message: "Signup failed",
        });
    }
});
exports.createPharmacyUser = createPharmacyUser;
const loginPharmacyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const checkIfUserExists = yield pharmacyUserModel_1.default.findOne({
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
        }
        else if (!(yield bcrypt_1.default.compare(password, checkIfUserExists.password))) {
            res.status(404).json({
                success: false,
                message: "Password is incorrect",
            });
            return;
        }
        else if (checkIfUserExists.isBlocked === "Blocked") {
            res.status(404).json({
                success: false,
                message: "Access denied! You are blocked!",
            });
            return;
        }
        else if (checkIfUserExists.SoftDeleted) {
            res.status(404).json({
                success: false,
                message: "This account has been deleted. Contact admin for account recovery",
            });
            return;
        }
        else {
            const token = jsonwebtoken_1.default.sign({ id: checkIfUserExists.id }, process.env.TOKEN_SECRET, {
                expiresIn: "1d",
            });
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
    }
    catch (error) {
        console.log("Error during user Login", error);
        res.status(500).json({
            success: false,
            message: "Login failed",
        });
    }
});
exports.loginPharmacyUser = loginPharmacyUser;
const updatePharmacyUserProfileByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    const { firstName, lastName, email, phoneNumber, role, isBlocked } = req.body;
    try {
        const findPharmacyUserByID = yield pharmacyUserModel_1.default.findByPk(userID);
        const isProfileSame = (findPharmacyUserByID === null || findPharmacyUserByID === void 0 ? void 0 : findPharmacyUserByID.firstName) === firstName &&
            (findPharmacyUserByID === null || findPharmacyUserByID === void 0 ? void 0 : findPharmacyUserByID.lastName) === lastName &&
            (findPharmacyUserByID === null || findPharmacyUserByID === void 0 ? void 0 : findPharmacyUserByID.email) === email &&
            (findPharmacyUserByID === null || findPharmacyUserByID === void 0 ? void 0 : findPharmacyUserByID.phoneNumber) === phoneNumber &&
            (findPharmacyUserByID === null || findPharmacyUserByID === void 0 ? void 0 : findPharmacyUserByID.role) === role &&
            (findPharmacyUserByID === null || findPharmacyUserByID === void 0 ? void 0 : findPharmacyUserByID.isBlocked) === isBlocked;
        if (findPharmacyUserByID &&
            !findPharmacyUserByID.SoftDeleted &&
            !isProfileSame) {
            const updatePharmacyUser = yield (findPharmacyUserByID === null || findPharmacyUserByID === void 0 ? void 0 : findPharmacyUserByID.update({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                role: role,
                isBlocked: isBlocked,
            }));
            if (updatePharmacyUser) {
                const findAllUsers = yield pharmacyUserModel_1.default.findAll({
                    where: {
                        SoftDeleted: false,
                    },
                    order: [["createdAt", "DESC"]],
                });
                res.status(200).json({
                    success: true,
                    message: "Profile updated",
                    users: findAllUsers,
                });
                return;
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Profile update failed",
                });
                return;
            }
        }
        else {
            const findAllUsers = yield pharmacyUserModel_1.default.findAll({
                where: {
                    SoftDeleted: false,
                },
                order: [["createdAt", "DESC"]],
            });
            res.status(404).json({
                success: true,
                message: "You have made no changes",
                users: findAllUsers,
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while updating user profile", error);
        res.status(500).json({
            success: false,
            message: "Profile update failed",
        });
    }
});
exports.updatePharmacyUserProfileByAdmin = updatePharmacyUserProfileByAdmin;
const fetchOneUserByIDForProfileUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        res.status(401).json({ success: false, message: "Access denied!" });
        return;
    }
    try {
        const findUserByPK = yield pharmacyUserModel_1.default.findByPk(user.id);
        if (findUserByPK && !findUserByPK.SoftDeleted) {
            res.status(200).json({
                success: true,
                user: findUserByPK,
            });
            return;
        }
        else {
            res.status(200).json({
                success: false,
                message: "User not found",
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
});
exports.fetchOneUserByIDForProfileUpdate = fetchOneUserByIDForProfileUpdate;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, phoneNumber, role } = req.body;
    const user = req.user;
    if (!user) {
        res.status(401).json({ success: false, message: "Access denied!" });
        return;
    }
    try {
        const findPharmacyUserByID = yield pharmacyUserModel_1.default.findByPk(user.id);
        const isProfileSame = (findPharmacyUserByID === null || findPharmacyUserByID === void 0 ? void 0 : findPharmacyUserByID.firstName) === firstName &&
            (findPharmacyUserByID === null || findPharmacyUserByID === void 0 ? void 0 : findPharmacyUserByID.lastName) === lastName &&
            (findPharmacyUserByID === null || findPharmacyUserByID === void 0 ? void 0 : findPharmacyUserByID.email) === email &&
            (findPharmacyUserByID === null || findPharmacyUserByID === void 0 ? void 0 : findPharmacyUserByID.phoneNumber) === phoneNumber &&
            (findPharmacyUserByID === null || findPharmacyUserByID === void 0 ? void 0 : findPharmacyUserByID.role) === role;
        if (findPharmacyUserByID &&
            !findPharmacyUserByID.SoftDeleted &&
            !isProfileSame) {
            const updatePharmacyUser = yield (findPharmacyUserByID === null || findPharmacyUserByID === void 0 ? void 0 : findPharmacyUserByID.update({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                role: role,
            }));
            if (updatePharmacyUser) {
                res.status(200).json({
                    success: true,
                    message: "Profile updated",
                    user: updatePharmacyUser,
                });
                return;
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Profile update failed",
                });
                return;
            }
        }
        else {
            res.status(404).json({
                success: true,
                message: "You have made no changes",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while updating user profile");
        res.status(500).json({
            success: false,
            message: "Profile update failed",
        });
    }
});
exports.updateUserProfile = updateUserProfile;
const logoutUser = (req, res) => {
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
    }
    catch (error) {
        console.log("Error during logout", error);
        res.status(500).json({
            success: false,
            message: "Error during logout",
        });
    }
};
exports.logoutUser = logoutUser;
const fetchAllPharmacyUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllUsers = yield pharmacyUserModel_1.default.findAll({
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
        }
        else {
            res.status(200).json({
                success: true,
                users: [],
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
});
exports.fetchAllPharmacyUsers = fetchAllPharmacyUsers;
const fetchAllDeletedItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllUsers = yield pharmacyUserModel_1.default.findAll({
            where: {
                SoftDeleted: true,
            },
            order: [["createdAt", "DESC"]],
        });
        if (findAllUsers.length > 0) {
            res.status(200).json({
                success: true,
                users: findAllUsers,
            });
            return;
        }
        else {
            res.status(200).json({
                success: true,
                users: [],
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
});
exports.fetchAllDeletedItems = fetchAllDeletedItems;
const fetchOneUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    try {
        const findUserByPK = yield pharmacyUserModel_1.default.findByPk(userID);
        if (findUserByPK && !findUserByPK.SoftDeleted) {
            res.status(200).json({
                success: true,
                user: findUserByPK,
            });
            return;
        }
        else {
            res.status(200).json({
                success: false,
                message: "User not found",
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
});
exports.fetchOneUserByID = fetchOneUserByID;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    try {
        const findPharmacyUserByID = yield pharmacyUserModel_1.default.findByPk(userID);
        if (findPharmacyUserByID && !findPharmacyUserByID.SoftDeleted) {
            const softDeletePharmacyUser = yield findPharmacyUserByID.update({
                SoftDeleted: true,
            });
            if (softDeletePharmacyUser) {
                const findAllUsers = yield pharmacyUserModel_1.default.findAll({
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
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Failed to delete user",
                });
                return;
            }
        }
        else {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while deleting user");
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
        });
    }
});
exports.deleteUser = deleteUser;
const undoDeletedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    try {
        const findPharmacyUserByID = yield pharmacyUserModel_1.default.findByPk(userID);
        if (findPharmacyUserByID && findPharmacyUserByID.SoftDeleted) {
            const softDeletePharmacyUser = yield findPharmacyUserByID.update({
                SoftDeleted: false,
            });
            if (softDeletePharmacyUser) {
                const findAllUsers = yield pharmacyUserModel_1.default.findAll({
                    where: {
                        SoftDeleted: true,
                    },
                    order: [["createdAt", "DESC"]],
                });
                res.status(200).json({
                    success: true,
                    message: "User restored",
                    users: findAllUsers,
                });
                return;
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Failed to undo user",
                });
                return;
            }
        }
        else {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while restoring user", error);
        res.status(500).json({
            success: false,
            message: "Failed to undo user",
        });
    }
});
exports.undoDeletedUser = undoDeletedUser;
