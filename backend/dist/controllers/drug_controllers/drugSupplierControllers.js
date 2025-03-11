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
exports.fetchAllDeletedDrugSuppliers = exports.undoDeletedDrugSupplier = exports.deleteDrugSupplier = exports.updateDrugSupplier = exports.findSupplierByUUID = exports.findAllDrugSuppliers = exports.addNewDrugSupplier = void 0;
const drugSupplierModel_1 = __importDefault(require("../../models/drug_model/drugSupplierModel"));
const drugsModel_1 = __importDefault(require("../../models/drug_model/drugsModel"));
const addNewDrugSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { drugID, supplierName, contactPersonName, supplierEmail, supplierPhoneNumber, supplierAddress, licenseNumber, } = req.body;
    try {
        const doesSupplierExist = yield drugSupplierModel_1.default.findOne({
            where: {
                supplierEmail: supplierEmail,
                softDeleted: false,
            },
        });
        if (doesSupplierExist) {
            res.status(400).json({
                success: false,
                message: "Supplier already exists",
            });
            return;
        }
        const newDrugSupplier = yield drugSupplierModel_1.default.create({
            drugID,
            supplierName,
            contactPersonName,
            supplierEmail,
            supplierPhoneNumber,
            supplierAddress,
            licenseNumber,
            softDeleted: false,
        });
        const findAllSuppliers = yield drugSupplierModel_1.default.findAll({
            where: { softDeleted: false },
            order: [["createdAt", "ASC"]],
        });
        if (newDrugSupplier) {
            res.status(200).json({
                success: true,
                supplier: newDrugSupplier,
                allSuppliers: findAllSuppliers,
                message: "Drug Supplier added",
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Failed to add drug supplier",
            });
        }
    }
    catch (error) {
        console.log("Error while adding new drug supplier", error);
        res.status(500).json({
            success: false,
            message: "Failed to add drug supplier",
        });
    }
});
exports.addNewDrugSupplier = addNewDrugSupplier;
const findAllDrugSuppliers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSuppliers = yield drugSupplierModel_1.default.findAll({
            where: { softDeleted: false },
            order: [["supplierName", "ASC"]],
        });
        if (allSuppliers.length > 0) {
            res.status(200).json({
                success: true,
                allSuppliers,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "No suppliers found",
            });
        }
    }
    catch (error) {
        console.log("Error while fetching suppliers", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch suppliers",
        });
    }
});
exports.findAllDrugSuppliers = findAllDrugSuppliers;
const findSupplierByUUID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { supplierID, drugID } = req.params;
        const supplier = yield drugSupplierModel_1.default.findByPk(supplierID, {
            include: {
                model: drugsModel_1.default,
                as: "drug",
                where: {
                    drugID: drugID,
                },
            },
        });
        if (supplier && !supplier.softDeleted) {
            res.status(200).json({
                success: true,
                supplier: supplier,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Supplier not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while fetching supplier", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch supplier",
        });
    }
});
exports.findSupplierByUUID = findSupplierByUUID;
const updateDrugSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { supplierID } = req.params;
        const { drugID, supplierName, contactPersonName, supplierEmail, supplierPhoneNumber, supplierAddress, licenseNumber, } = req.body;
        const supplier = yield drugSupplierModel_1.default.findByPk(supplierID);
        const isSupplierSame = (supplier === null || supplier === void 0 ? void 0 : supplier.drugID) === drugID &&
            (supplier === null || supplier === void 0 ? void 0 : supplier.supplierName) === supplierName &&
            (supplier === null || supplier === void 0 ? void 0 : supplier.contactPersonName) === contactPersonName &&
            (supplier === null || supplier === void 0 ? void 0 : supplier.supplierEmail) === supplierEmail &&
            (supplier === null || supplier === void 0 ? void 0 : supplier.supplierPhoneNumber) === supplierPhoneNumber &&
            (supplier === null || supplier === void 0 ? void 0 : supplier.supplierAddress) === supplierAddress &&
            (supplier === null || supplier === void 0 ? void 0 : supplier.licenseNumber) === licenseNumber;
        if (supplier && !supplier.softDeleted && !isSupplierSame) {
            const updatedSupplier = yield supplier.update({
                drugID: drugID,
                supplierName,
                contactPersonName,
                supplierEmail,
                supplierPhoneNumber,
                supplierAddress,
                licenseNumber,
            });
            const findAllSuppliers = yield drugSupplierModel_1.default.findAll({
                where: { softDeleted: false },
                order: [["supplierName", "ASC"]],
            });
            res.status(200).json({
                success: true,
                supplier: updatedSupplier,
                allSuppliers: findAllSuppliers,
                message: "Supplier updated",
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "You have made no changes",
            });
        }
    }
    catch (error) {
        console.log("Error while updating supplier", error);
        res.status(500).json({
            success: false,
            message: "Failed to update supplier",
        });
    }
});
exports.updateDrugSupplier = updateDrugSupplier;
const deleteDrugSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { supplierID } = req.params;
        const supplier = yield drugSupplierModel_1.default.findOne({
            where: {
                supplierID: supplierID,
                softDeleted: false,
            },
        });
        if (supplier) {
            yield supplier.update({ softDeleted: true });
            const findAllSuppliers = yield drugSupplierModel_1.default.findAll({
                where: { softDeleted: false },
                order: [["supplierName", "ASC"]],
            });
            res.status(200).json({
                success: true,
                message: "Supplier deleted",
                allSuppliers: findAllSuppliers,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Supplier not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while deleting supplier", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete supplier",
        });
    }
});
exports.deleteDrugSupplier = deleteDrugSupplier;
const undoDeletedDrugSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { supplierID } = req.params;
        const supplier = yield drugSupplierModel_1.default.findOne({
            where: {
                supplierID: supplierID,
                softDeleted: true,
            },
        });
        if (supplier) {
            yield supplier.update({ softDeleted: false });
            const findAllSuppliers = yield drugSupplierModel_1.default.findAll({
                where: { softDeleted: true },
                order: [["supplierName", "ASC"]],
            });
            res.status(200).json({
                success: true,
                message: "Supplier restored",
                allSuppliers: findAllSuppliers,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Supplier not found",
            });
        }
    }
    catch (error) {
        console.log("Error while restoring supplier", error);
        res.status(500).json({
            success: false,
            message: "Failed to restore supplier",
        });
    }
});
exports.undoDeletedDrugSupplier = undoDeletedDrugSupplier;
const fetchAllDeletedDrugSuppliers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDeletedSuppliers = yield drugSupplierModel_1.default.findAll({
            where: {
                softDeleted: true,
            },
            order: [["supplierName", "ASC"]],
        });
        if (allDeletedSuppliers.length > 0) {
            res.status(200).json({
                success: true,
                allSuppliers: allDeletedSuppliers,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "No deleted suppliers",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch deleted suppliers",
        });
    }
});
exports.fetchAllDeletedDrugSuppliers = fetchAllDeletedDrugSuppliers;
