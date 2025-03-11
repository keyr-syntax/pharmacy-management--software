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
exports.fetchAllDeletedDrugPricing = exports.undoDeletedDrugPricing = exports.deleteDrugPricing = exports.updateDrugPricing = exports.findPricingByUUID = exports.findAllDrugPricing = exports.addNewDrugPricing = void 0;
const drugPricingModel_1 = __importDefault(require("../../models/drug_model/drugPricingModel"));
const drugsModel_1 = __importDefault(require("../../models/drug_model/drugsModel"));
const addNewDrugPricing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { drugID, purchasePrice, sellingPrice, taxRate, margin, insuranceCoverage, } = req.body;
    try {
        const doesDrugPricingExist = yield drugPricingModel_1.default.findOne({
            where: {
                drugID: drugID,
                softDeleted: false,
            },
        });
        if (doesDrugPricingExist) {
            res.status(400).json({
                success: false,
                message: "Pricing already exists",
            });
            return;
        }
        else {
            const newDrugPricing = yield drugPricingModel_1.default.create({
                drugID,
                purchasePrice,
                sellingPrice,
                taxRate,
                margin,
                insuranceCoverage,
                softDeleted: false,
            });
            const findAllDrugPricing = yield drugPricingModel_1.default.findAll({
                where: { softDeleted: false, drugID: drugID },
                order: [["createdAt", "ASC"]],
            });
            if (newDrugPricing) {
                res.status(200).json({
                    success: true,
                    pricing: newDrugPricing,
                    allPricing: findAllDrugPricing,
                    message: "Drug Pricing added",
                });
                return;
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Failed to add drug pricing",
                });
                return;
            }
        }
    }
    catch (error) {
        console.log("Error while adding new drug pricing", error);
        res.status(500).json({
            success: false,
            message: "Failed to add drug pricing",
        });
    }
});
exports.addNewDrugPricing = addNewDrugPricing;
const findAllDrugPricing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDrugPricing = yield drugPricingModel_1.default.findAll({
            where: { softDeleted: false },
            order: [["createdAt", "ASC"]],
        });
        let pricingAlongWithItsDrug = [];
        for (const pricing of allDrugPricing) {
            const findPricingByPK = yield drugPricingModel_1.default.findByPk(pricing.pricingID, {
                include: {
                    model: drugsModel_1.default,
                    as: "drug",
                    where: {
                        drugID: pricing.drugID,
                    },
                },
            });
            pricingAlongWithItsDrug.push(findPricingByPK);
        }
        if (allDrugPricing) {
            res.status(200).json({
                success: true,
                allDrugPricing: pricingAlongWithItsDrug,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Failed to find drug pricing",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while finding all drug pricing", error);
        res.status(500).json({
            success: false,
            message: "Failed to find drug pricing",
        });
    }
});
exports.findAllDrugPricing = findAllDrugPricing;
const findPricingByUUID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pricingID } = req.params;
        const pricingByPK = yield drugPricingModel_1.default.findByPk(pricingID);
        if (pricingByPK && !pricingByPK.softDeleted) {
            res.status(200).json({
                success: true,
                pricing: pricingByPK,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Pricing not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while finding Pricing", error);
        res.status(500).json({
            success: false,
            message: "Failed to find Pricing by UUID",
        });
    }
});
exports.findPricingByUUID = findPricingByUUID;
const updateDrugPricing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pricingID } = req.params;
        const { drugID, purchasePrice, sellingPrice, taxRate, margin, insuranceCoverage, } = req.body;
        const pricingByPK = yield drugPricingModel_1.default.findByPk(pricingID);
        const isPricingTheSame = (pricingByPK === null || pricingByPK === void 0 ? void 0 : pricingByPK.drugID) === drugID &&
            (pricingByPK === null || pricingByPK === void 0 ? void 0 : pricingByPK.purchasePrice) === purchasePrice &&
            (pricingByPK === null || pricingByPK === void 0 ? void 0 : pricingByPK.sellingPrice) === sellingPrice &&
            (pricingByPK === null || pricingByPK === void 0 ? void 0 : pricingByPK.taxRate) === taxRate &&
            (pricingByPK === null || pricingByPK === void 0 ? void 0 : pricingByPK.margin) === margin &&
            (pricingByPK === null || pricingByPK === void 0 ? void 0 : pricingByPK.insuranceCoverage) === insuranceCoverage;
        if (pricingByPK && !pricingByPK.softDeleted && !isPricingTheSame) {
            const updatePricing = yield pricingByPK.update({
                drugID: drugID,
                purchasePrice: purchasePrice,
                sellingPrice: sellingPrice,
                taxRate: taxRate,
                margin: margin,
                insuranceCoverage: insuranceCoverage,
            });
            if (updatePricing) {
                res.status(200).json({
                    success: true,
                    pricing: updatePricing,
                    message: "Pricing updated",
                });
                return;
            }
            else {
                res.status(404).json({
                    success: true,
                    message: "Failed to update pricing",
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
        console.log("Error while updating pricing", error);
        res.status(500).json({
            success: false,
            message: "Failed to update pricing",
        });
    }
});
exports.updateDrugPricing = updateDrugPricing;
const deleteDrugPricing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pricingID } = req.params;
        const pricingByPK = yield drugPricingModel_1.default.findOne({
            where: {
                pricingID: pricingID,
                softDeleted: false,
            },
        });
        if (pricingByPK) {
            const softDeletePricing = yield pricingByPK.update({
                softDeleted: true,
            });
            const allDrugPricing = yield drugPricingModel_1.default.findAll({
                where: { softDeleted: false },
                order: [["createdAt", "ASC"]],
            });
            let pricingAlongWithItsDrug = [];
            for (const pricing of allDrugPricing) {
                const findPricingByPK = yield drugPricingModel_1.default.findByPk(pricing.pricingID, {
                    include: {
                        model: drugsModel_1.default,
                        as: "drug",
                        where: {
                            drugID: pricing.drugID,
                        },
                    },
                });
                pricingAlongWithItsDrug.push(findPricingByPK);
            }
            if (softDeletePricing) {
                res.status(200).json({
                    success: true,
                    message: "Deleted",
                    allPricing: pricingAlongWithItsDrug,
                });
                return;
            }
            else {
                res.status(200).json({
                    success: true,
                    message: "Failed to delete pricing",
                });
                return;
            }
        }
        else {
            res.status(404).json({
                success: false,
                message: "Pricing not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while deleting pricing", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete pricing",
        });
    }
});
exports.deleteDrugPricing = deleteDrugPricing;
const undoDeletedDrugPricing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pricingID } = req.params;
    try {
        const pricingByID = yield drugPricingModel_1.default.findOne({
            where: {
                pricingID: pricingID,
                softDeleted: true,
            },
        });
        if (pricingByID) {
            const undoSoftDeletedPricing = yield pricingByID.update({
                softDeleted: false,
            });
            if (undoSoftDeletedPricing) {
                const findAllPricing = yield drugPricingModel_1.default.findAll({
                    where: {
                        softDeleted: true,
                    },
                    order: [["createdAt", "ASC"]],
                });
                let pricingAlongWithItsDrug = [];
                for (const pricing of findAllPricing) {
                    const findPricingByPK = yield drugPricingModel_1.default.findByPk(pricing.pricingID, {
                        include: {
                            model: drugsModel_1.default,
                            as: "drug",
                            where: {
                                drugID: pricing.drugID,
                            },
                        },
                    });
                    pricingAlongWithItsDrug.push(findPricingByPK);
                }
                res.status(200).json({
                    success: true,
                    message: "Pricing restored",
                    allPricing: pricingAlongWithItsDrug,
                });
                return;
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Failed to restore Pricing",
                });
                return;
            }
        }
        else {
            res.status(404).json({
                success: false,
                message: "Pricing not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while restoring Pricing", error);
        res.status(500).json({
            success: false,
            message: "Failed to restore Pricing",
        });
    }
});
exports.undoDeletedDrugPricing = undoDeletedDrugPricing;
const fetchAllDeletedDrugPricing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDeletedPricing = yield drugPricingModel_1.default.findAll({
            where: {
                softDeleted: true,
            },
            order: [["createdAt", "ASC"]],
        });
        let pricingAlongWithItsDrug = [];
        for (const pricing of allDeletedPricing) {
            const findPricingByPK = yield drugPricingModel_1.default.findByPk(pricing.pricingID, {
                include: {
                    model: drugsModel_1.default,
                    as: "drug",
                    where: {
                        drugID: pricing.drugID,
                    },
                },
            });
            pricingAlongWithItsDrug.push(findPricingByPK);
        }
        if (allDeletedPricing) {
            res.status(200).json({
                success: true,
                allPricing: pricingAlongWithItsDrug,
            });
            return;
        }
        else {
            res.status(200).json({
                success: true,
                message: "No deleted pricing",
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch deleted pricing",
        });
    }
});
exports.fetchAllDeletedDrugPricing = fetchAllDeletedDrugPricing;
