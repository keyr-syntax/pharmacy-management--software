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
exports.fetchAllDeletedDrugs = exports.undoDeletedDrug = exports.deleteDrug = exports.updateDrugDetails = exports.findDrugByUUID = exports.findAllDrugs = exports.addNewDrug = void 0;
const drugsModel_1 = __importDefault(require("../../models/drug_model/drugsModel"));
const drugSupplierModel_1 = __importDefault(require("../../models/drug_model/drugSupplierModel"));
const addNewDrug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { genericName, brandName, dosageForm, drugType, dosageStrength, routeOfDrugAdministration, unitsPerPack, drugClass, status, } = req.body;
    console.log("req.body", req.body);
    if (!genericName ||
        genericName.trim() === "" ||
        !brandName ||
        brandName.trim() === "" ||
        !dosageForm ||
        dosageForm.trim() === "" ||
        !drugType ||
        drugType.trim() === "" ||
        !dosageStrength ||
        dosageStrength.trim() === "" ||
        !unitsPerPack ||
        !drugClass ||
        drugClass.trim() === "" ||
        !status ||
        status.trim() === "" ||
        !routeOfDrugAdministration ||
        routeOfDrugAdministration.trim() === "") {
        res.status(400).json({
            success: false,
            message: "All fields are required",
        });
        return;
    }
    try {
        const checkIfDrugExists = yield drugsModel_1.default.findOne({
            where: {
                genericName: genericName,
                brandName: brandName,
                softDeleted: false,
            },
        });
        if (checkIfDrugExists) {
            res.status(400).json({
                success: false,
                message: "Drug already exists",
            });
            return;
        }
        else {
            const newDrug = yield drugsModel_1.default.create({
                genericName,
                brandName,
                dosageForm,
                drugType,
                dosageStrength,
                routeOfDrugAdministration,
                unitsPerPack,
                drugClass,
                status,
                softDeleted: false,
            });
            const findAllDrugs = yield drugsModel_1.default.findAll({
                where: { softDeleted: false },
                order: [["genericName", "ASC"]],
            });
            if (newDrug) {
                res.status(200).json({
                    success: true,
                    newDrug: newDrug,
                    allDrugs: findAllDrugs,
                    message: "Product added",
                });
                return;
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Failed to add drug",
                });
                return;
            }
        }
    }
    catch (error) {
        console.log("Error while adding new drug", error);
        res.status(500).json({
            success: false,
            message: "Failed to add drug",
        });
    }
});
exports.addNewDrug = addNewDrug;
const findAllDrugs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllDrugs = yield drugsModel_1.default.findAll({
            where: { softDeleted: false },
            order: [["genericName", "ASC"]],
        });
        if (findAllDrugs) {
            res.status(200).json({
                success: true,
                allDrugs: findAllDrugs,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Failed to find drugs",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while finding drugs", error);
        res.status(500).json({
            success: false,
            message: "Failed to find drugs",
        });
    }
});
exports.findAllDrugs = findAllDrugs;
const findDrugByUUID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { drugID } = req.params;
        const findDrugByPK = yield drugsModel_1.default.findByPk(drugID);
        if (findDrugByPK && !findDrugByPK.softDeleted) {
            const drugDetails = yield drugsModel_1.default.findByPk(drugID, {
                include: [
                    {
                        model: drugSupplierModel_1.default,
                        as: "supplier",
                        where: {
                            drugID: drugID,
                        },
                    },
                ],
            });
            res.status(200).json({
                success: true,
                drug: findDrugByPK,
                drugDetails: drugDetails,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Drug not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while finding drug", error);
        res.status(500).json({
            success: false,
            message: "Failed to find drug by UUID",
        });
    }
});
exports.findDrugByUUID = findDrugByUUID;
const updateDrugDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { drugID } = req.params;
        const { genericName, brandName, dosageForm, drugType, dosageStrength, routeOfDrugAdministration, unitsPerPack, drugClass, status, } = req.body;
        const findDrugByPK = yield drugsModel_1.default.findOne({
            where: {
                drugID: drugID,
                softDeleted: false,
            },
        });
        const areDetailsTheSame = (findDrugByPK === null || findDrugByPK === void 0 ? void 0 : findDrugByPK.genericName) === genericName &&
            (findDrugByPK === null || findDrugByPK === void 0 ? void 0 : findDrugByPK.brandName) === brandName &&
            (findDrugByPK === null || findDrugByPK === void 0 ? void 0 : findDrugByPK.dosageForm) === dosageForm &&
            (findDrugByPK === null || findDrugByPK === void 0 ? void 0 : findDrugByPK.drugType) === drugType &&
            (findDrugByPK === null || findDrugByPK === void 0 ? void 0 : findDrugByPK.dosageStrength) === dosageStrength &&
            (findDrugByPK === null || findDrugByPK === void 0 ? void 0 : findDrugByPK.routeOfDrugAdministration) === routeOfDrugAdministration &&
            (findDrugByPK === null || findDrugByPK === void 0 ? void 0 : findDrugByPK.unitsPerPack) === unitsPerPack &&
            (findDrugByPK === null || findDrugByPK === void 0 ? void 0 : findDrugByPK.drugClass) === drugClass &&
            (findDrugByPK === null || findDrugByPK === void 0 ? void 0 : findDrugByPK.status) === status;
        if (findDrugByPK && !areDetailsTheSame) {
            const updateDrugDetails = yield (findDrugByPK === null || findDrugByPK === void 0 ? void 0 : findDrugByPK.update({
                genericName: genericName,
                brandName: brandName,
                dosageForm: dosageForm,
                drugType: drugType,
                dosageStrength: dosageStrength,
                routeOfDrugAdministration: routeOfDrugAdministration,
                unitsPerPack: unitsPerPack,
                drugClass: drugClass,
                status: status,
            }));
            const findAllDrugs = yield drugsModel_1.default.findAll({
                where: { softDeleted: false },
                order: [["genericName", "ASC"]],
            });
            if (updateDrugDetails) {
                res.status(200).json({
                    success: true,
                    drug: updateDrugDetails,
                    allDrugs: findAllDrugs,
                    message: "Product updated",
                });
                return;
            }
            else {
                res.status(404).json({
                    success: true,
                    message: "Failed to update drug details",
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
        console.log("Error while updating drug details", error);
        res.status(500).json({
            success: false,
            message: "Failed to update drug details",
        });
    }
});
exports.updateDrugDetails = updateDrugDetails;
const deleteDrug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { drugID } = req.params;
        const findDrugByPK = yield drugsModel_1.default.findByPk(drugID);
        if (findDrugByPK) {
            const softDeleteDrug = yield findDrugByPK.update({
                softDeleted: true,
            });
            const findAllDrugs = yield drugsModel_1.default.findAll({
                where: { softDeleted: false },
                order: [["genericName", "ASC"]],
            });
            if (softDeleteDrug) {
                res.status(200).json({
                    success: true,
                    message: "Deleted",
                    allDrugs: findAllDrugs,
                });
                return;
            }
            else {
                res.status(200).json({
                    success: true,
                    message: "Failed to delete drug",
                });
                return;
            }
        }
        else {
            res.status(404).json({
                success: false,
                message: "Drug not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while deleting drug", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete drug",
        });
    }
});
exports.deleteDrug = deleteDrug;
const undoDeletedDrug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { drugID } = req.params;
        const findDrugByPK = yield drugsModel_1.default.findByPk(drugID);
        if (findDrugByPK && findDrugByPK.softDeleted) {
            const softDeleteDrug = yield findDrugByPK.update({
                softDeleted: false,
            });
            if (softDeleteDrug) {
                const findAllDrugs = yield drugsModel_1.default.findAll({
                    where: { softDeleted: true },
                    order: [["genericName", "ASC"]],
                });
                res.status(200).json({
                    success: true,
                    message: "Product restored",
                    allDrugs: findAllDrugs,
                });
                return;
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Failed to restore drug",
                });
                return;
            }
        }
        else {
            res.status(404).json({
                success: false,
                message: "Drug not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while restoring drug", error);
        res.status(500).json({
            success: false,
            message: "Failed to restore drug",
        });
    }
});
exports.undoDeletedDrug = undoDeletedDrug;
const fetchAllDeletedDrugs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllDrugs = yield drugsModel_1.default.findAll({
            where: { softDeleted: true },
            order: [["genericName", "ASC"]],
        });
        if (findAllDrugs) {
            res.status(200).json({
                success: true,
                allDrugs: findAllDrugs,
            });
            return;
        }
        else {
            res.status(200).json({
                success: true,
                message: "No deleted drugs",
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch deleted drugs",
        });
    }
});
exports.fetchAllDeletedDrugs = fetchAllDeletedDrugs;
