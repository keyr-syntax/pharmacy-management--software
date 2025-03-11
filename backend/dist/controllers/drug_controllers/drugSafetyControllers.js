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
exports.fetchAllDeletedDrugSafety = exports.undoDeletedDrugSafety = exports.deleteDrugSafety = exports.updateDrugSafety = exports.findSafetyByUUID = exports.findAllDrugSafety = exports.addNewDrugSafety = void 0;
const drugSafetyModel_1 = __importDefault(require("../../models/drug_model/drugSafetyModel"));
const drugsModel_1 = __importDefault(require("../../models/drug_model/drugsModel"));
const addNewDrugSafety = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { drugID, contraindications, drugInteractions, pregnancyCategory, maxDailyDose, } = req.body;
    try {
        const doesDrugSafetyExist = yield drugSafetyModel_1.default.findOne({
            where: {
                drugID: drugID,
                softDeleted: false,
            },
        });
        if (doesDrugSafetyExist) {
            res.status(400).json({
                success: false,
                message: "Safety information already exists",
            });
            return;
        }
        else {
            const newDrugSafety = yield drugSafetyModel_1.default.create({
                drugID,
                contraindications,
                drugInteractions,
                pregnancyCategory,
                maxDailyDose,
                softDeleted: false,
            });
            const findAllDrugSafety = yield drugSafetyModel_1.default.findAll({
                where: { softDeleted: false, drugID: drugID },
                order: [["createdAt", "ASC"]],
            });
            if (newDrugSafety) {
                res.status(200).json({
                    success: true,
                    safety: newDrugSafety,
                    allSafety: findAllDrugSafety,
                    message: "Drug Safety added",
                });
                return;
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Failed to add drug safety",
                });
                return;
            }
        }
    }
    catch (error) {
        console.log("Error while adding new drug safety", error);
        res.status(500).json({
            success: false,
            message: "Failed to add drug safety",
        });
    }
});
exports.addNewDrugSafety = addNewDrugSafety;
const findAllDrugSafety = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDrugSafety = yield drugSafetyModel_1.default.findAll({
            where: { softDeleted: false },
            order: [["createdAt", "ASC"]],
        });
        let safetyAlongWithItsDrug = [];
        for (const safety of allDrugSafety) {
            const findSafetyByPK = yield drugSafetyModel_1.default.findByPk(safety.drugSafetyID, {
                include: {
                    model: drugsModel_1.default,
                    as: "drug",
                    where: {
                        drugID: safety.drugID,
                    },
                },
            });
            safetyAlongWithItsDrug.push(findSafetyByPK);
        }
        if (allDrugSafety) {
            res.status(200).json({
                success: true,
                allDrugSafety: safetyAlongWithItsDrug,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Failed to find drug safety",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while finding all drug safety", error);
        res.status(500).json({
            success: false,
            message: "Failed to find drug safety",
        });
    }
});
exports.findAllDrugSafety = findAllDrugSafety;
const findSafetyByUUID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { safetyID, drugID } = req.params;
        const safetyByPK = yield drugSafetyModel_1.default.findByPk(safetyID, {
            include: {
                model: drugsModel_1.default,
                as: "drug",
                where: {
                    drugID: drugID,
                },
            },
        });
        if (safetyByPK && !safetyByPK.softDeleted) {
            res.status(200).json({
                success: true,
                safety: safetyByPK,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Safety information not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while finding Safety", error);
        res.status(500).json({
            success: false,
            message: "Failed to find Safety by UUID",
        });
    }
});
exports.findSafetyByUUID = findSafetyByUUID;
const updateDrugSafety = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { safetyID } = req.params;
        const { drugID, contraindications, drugInteractions, pregnancyCategory, maxDailyDose, } = req.body;
        const safetyByPK = yield drugSafetyModel_1.default.findByPk(safetyID);
        const isSafetyTheSame = (safetyByPK === null || safetyByPK === void 0 ? void 0 : safetyByPK.drugID) === drugID &&
            (safetyByPK === null || safetyByPK === void 0 ? void 0 : safetyByPK.contraindications) === contraindications &&
            (safetyByPK === null || safetyByPK === void 0 ? void 0 : safetyByPK.drugInteractions) === drugInteractions &&
            (safetyByPK === null || safetyByPK === void 0 ? void 0 : safetyByPK.pregnancyCategory) === pregnancyCategory &&
            (safetyByPK === null || safetyByPK === void 0 ? void 0 : safetyByPK.maxDailyDose) === maxDailyDose;
        if (safetyByPK && !safetyByPK.softDeleted && !isSafetyTheSame) {
            const updateSafety = yield safetyByPK.update({
                drugID: drugID,
                contraindications: contraindications,
                drugInteractions: drugInteractions,
                pregnancyCategory: pregnancyCategory,
                maxDailyDose: maxDailyDose,
            });
            const findAllDrugSafety = yield drugSafetyModel_1.default.findAll({
                where: { softDeleted: false },
                order: [["createdAt", "ASC"]],
            });
            if (updateSafety) {
                res.status(200).json({
                    success: true,
                    safety: updateSafety,
                    allSafety: findAllDrugSafety,
                    message: "Safety information updated",
                });
                return;
            }
            else {
                res.status(404).json({
                    success: true,
                    message: "Failed to update safety information",
                });
                return;
            }
        }
        else {
            res.status(404).json({
                success: false,
                message: "You have made no changes",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while updating safety information", error);
        res.status(500).json({
            success: false,
            message: "Failed to update safety information",
        });
    }
});
exports.updateDrugSafety = updateDrugSafety;
const deleteDrugSafety = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { safetyID } = req.params;
        const safetyByPK = yield drugSafetyModel_1.default.findOne({
            where: {
                drugSafetyID: safetyID,
                softDeleted: false,
            },
        });
        if (safetyByPK) {
            const softDeleteSafety = yield safetyByPK.update({
                softDeleted: true,
            });
            const findAllDrugSafety = yield drugSafetyModel_1.default.findAll({
                where: { softDeleted: false },
                order: [["createdAt", "ASC"]],
            });
            if (softDeleteSafety) {
                res.status(200).json({
                    success: true,
                    message: "Deleted",
                    allSafety: findAllDrugSafety,
                });
                return;
            }
            else {
                res.status(200).json({
                    success: true,
                    message: "Failed to delete safety information",
                });
                return;
            }
        }
        else {
            res.status(404).json({
                success: false,
                message: "Safety information not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while deleting safety information", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete safety information",
        });
    }
});
exports.deleteDrugSafety = deleteDrugSafety;
const undoDeletedDrugSafety = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { safetyID } = req.params;
    try {
        const safetyByID = yield drugSafetyModel_1.default.findOne({
            where: {
                drugSafetyID: safetyID,
                softDeleted: true,
            },
        });
        if (safetyByID) {
            const undoSoftDeletedSafety = yield safetyByID.update({
                softDeleted: false,
            });
            if (undoSoftDeletedSafety) {
                const findAllSafety = yield drugSafetyModel_1.default.findAll({
                    where: {
                        softDeleted: true,
                    },
                    order: [["createdAt", "ASC"]],
                });
                res.status(200).json({
                    success: true,
                    message: "Safety information restored",
                    allSafety: findAllSafety,
                });
                return;
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Failed to restore safety information",
                });
                return;
            }
        }
        else {
            res.status(404).json({
                success: false,
                message: "Safety information not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while restoring safety information", error);
        res.status(500).json({
            success: false,
            message: "Failed to restore safety information",
        });
    }
});
exports.undoDeletedDrugSafety = undoDeletedDrugSafety;
const fetchAllDeletedDrugSafety = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDeletedSafety = yield drugSafetyModel_1.default.findAll({
            where: {
                softDeleted: true,
            },
            order: [["createdAt", "ASC"]],
        });
        if (allDeletedSafety) {
            res.status(200).json({
                success: true,
                allSafety: allDeletedSafety,
            });
            return;
        }
        else {
            res.status(200).json({
                success: true,
                message: "No deleted safety information",
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch deleted safety information",
        });
    }
});
exports.fetchAllDeletedDrugSafety = fetchAllDeletedDrugSafety;
