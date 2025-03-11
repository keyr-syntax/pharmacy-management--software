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
exports.adminAuthenticationMiddleware = exports.managerAuthenticationMiddleware = exports.userAuthenticationMiddleware = void 0;
const pharmacyUserModel_1 = __importDefault(require("../models/user_model/pharmacyUserModel"));
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
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
const userAuthenticationMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authenticationMiddleware = passport_1.default.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Access denied",
            });
        }
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Access denied",
            });
        }
        else if ((user.role === "pharmacist" &&
            user.isBlocked === "Not Blocked" &&
            !user.SoftDeleted) ||
            (user.role === "manager" &&
                user.isBlocked === "Not Blocked" &&
                !user.SoftDeleted) ||
            (user.role === "admin" &&
                user.isBlocked === "Not Blocked" &&
                !user.SoftDeleted)) {
            req.user = user;
            next();
        }
        else {
            res.status(404).json({
                success: false,
                message: "Access denied",
            });
            return;
        }
    });
    authenticationMiddleware(req, res, next);
});
exports.userAuthenticationMiddleware = userAuthenticationMiddleware;
const managerAuthenticationMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const managerAuthenticationMiddleware = passport_1.default.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Access denied",
            });
            return;
        }
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Access denied",
            });
            return;
        }
        else if ((user.role === "manager" &&
            user.isBlocked === "Not Blocked" &&
            !user.SoftDeleted) ||
            (user.role === "admin" &&
                user.isBlocked === "Not Blocked" &&
                !user.SoftDeleted)) {
            req.user = user;
            next();
        }
        else {
            res.status(404).json({
                success: false,
                message: "Access denied",
            });
            return;
        }
    });
    managerAuthenticationMiddleware(req, res, next);
});
exports.managerAuthenticationMiddleware = managerAuthenticationMiddleware;
const adminAuthenticationMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const adminAuthenticationMiddleware = passport_1.default.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Access denied",
            });
            return;
        }
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Access denied",
            });
            return;
        }
        else if (user.role === "admin" &&
            user.isBlocked === "Not Blocked" &&
            !user.SoftDeleted) {
            req.user = user;
            next();
        }
        else {
            res.status(404).json({
                success: false,
                message: "Access denied",
            });
            return;
        }
    });
    adminAuthenticationMiddleware(req, res, next);
});
exports.adminAuthenticationMiddleware = adminAuthenticationMiddleware;
