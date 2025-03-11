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
exports.fetchAllDeletedDrugInventory = exports.undoDeletedDrugInventory = exports.deleteDrugInventory = exports.updateDrugInventory = exports.findInventoryByUUID = exports.findAllDrugInventories = exports.addNewDrugInventory = void 0;
const drugInventory_1 = __importDefault(require("../../models/drug_model/drugInventory"));
const drugsModel_1 = __importDefault(require("../../models/drug_model/drugsModel"));
const addNewDrugInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { drugID, batchNumber, barCode, storageConditions, location, expiryDate, quantityInStock, minimumQuantityInStock, reorderStockLevel, } = req.body;
    try {
        const doesDrugInventoryExist = yield drugInventory_1.default.findOne({
            where: {
                drugID: drugID,
                batchNumber: batchNumber,
                softDeleted: false,
            },
        });
        if (doesDrugInventoryExist) {
            res.status(400).json({
                success: false,
                message: "Inventory already exists",
            });
            return;
        }
        else {
            const newDrugInventory = yield drugInventory_1.default.create({
                drugID,
                batchNumber,
                barCode,
                storageConditions,
                location,
                expiryDate,
                quantityInStock,
                minimumQuantityInStock,
                reorderStockLevel,
                softDeleted: false,
            });
            const findAllDrugInventories = yield drugInventory_1.default.findAll({
                where: { softDeleted: false, drugID: drugID },
                order: [["createdAt", "ASC"]],
            });
            if (newDrugInventory) {
                res.status(200).json({
                    success: true,
                    inventory: newDrugInventory,
                    allInventories: findAllDrugInventories,
                    message: "Drug Inventory added",
                });
                return;
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Failed to add drug inventory",
                });
                return;
            }
        }
    }
    catch (error) {
        console.log("Error while adding new drug inventory", error);
        res.status(500).json({
            success: false,
            message: "Failed to add drug inventory",
        });
    }
});
exports.addNewDrugInventory = addNewDrugInventory;
const findAllDrugInventories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDrugInventories = yield drugInventory_1.default.findAll({
            where: { softDeleted: false },
            order: [["createdAt", "ASC"]],
        });
        let inventoryAlongWithItsDrug = [];
        for (const inventory of allDrugInventories) {
            const findInventoryByPK = yield drugInventory_1.default.findByPk(inventory.drugInventoryID, {
                include: {
                    model: drugsModel_1.default,
                    as: "drug",
                    where: {
                        drugID: inventory.drugID,
                    },
                },
            });
            inventoryAlongWithItsDrug.push(findInventoryByPK);
        }
        if (allDrugInventories) {
            res.status(200).json({
                success: true,
                allDrugInventories: inventoryAlongWithItsDrug,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Failed to find drug inventory",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while finding all drug inventories", error);
        res.status(500).json({
            success: false,
            message: "Failed to find drug inventory",
        });
    }
});
exports.findAllDrugInventories = findAllDrugInventories;
const findInventoryByUUID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { drugInventoryID } = req.params;
        const inventoryByPK = yield drugInventory_1.default.findByPk(drugInventoryID);
        if (inventoryByPK && !inventoryByPK.softDeleted) {
            res.status(200).json({
                success: true,
                inventory: inventoryByPK,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Inventory not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while finding Inventory", error);
        res.status(500).json({
            success: false,
            message: "Failed to find Inventory by UUID",
        });
    }
});
exports.findInventoryByUUID = findInventoryByUUID;
const updateDrugInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { drugInventoryID } = req.params;
        const { drugID, batchNumber, barCode, storageConditions, location, expiryDate, quantityInStock, minimumQuantityInStock, reorderStockLevel, } = req.body;
        const inventoryByPK = yield drugInventory_1.default.findByPk(drugInventoryID);
        const isInventoryTheSame = (inventoryByPK === null || inventoryByPK === void 0 ? void 0 : inventoryByPK.drugID) === drugID &&
            (inventoryByPK === null || inventoryByPK === void 0 ? void 0 : inventoryByPK.batchNumber) === batchNumber &&
            (inventoryByPK === null || inventoryByPK === void 0 ? void 0 : inventoryByPK.barCode) === barCode &&
            (inventoryByPK === null || inventoryByPK === void 0 ? void 0 : inventoryByPK.storageConditions) === storageConditions &&
            (inventoryByPK === null || inventoryByPK === void 0 ? void 0 : inventoryByPK.location) === location &&
            (inventoryByPK === null || inventoryByPK === void 0 ? void 0 : inventoryByPK.expiryDate) === expiryDate &&
            (inventoryByPK === null || inventoryByPK === void 0 ? void 0 : inventoryByPK.quantityInStock) === quantityInStock &&
            (inventoryByPK === null || inventoryByPK === void 0 ? void 0 : inventoryByPK.minimumQuantityInStock) === minimumQuantityInStock &&
            (inventoryByPK === null || inventoryByPK === void 0 ? void 0 : inventoryByPK.reorderStockLevel) === reorderStockLevel;
        if (inventoryByPK && !inventoryByPK.softDeleted && !isInventoryTheSame) {
            const updateInventory = yield inventoryByPK.update({
                drugID: drugID,
                batchNumber: batchNumber,
                barCode: barCode,
                storageConditions: storageConditions,
                location: location,
                expiryDate: expiryDate,
                quantityInStock: quantityInStock,
                minimumQuantityInStock: minimumQuantityInStock,
                reorderStockLevel: reorderStockLevel,
            });
            const findAllDrugInventories = yield drugInventory_1.default.findAll({
                where: { softDeleted: false },
                order: [["createdAt", "ASC"]],
            });
            if (updateInventory) {
                res.status(200).json({
                    success: true,
                    inventory: updateInventory,
                    allInventories: findAllDrugInventories,
                    message: "Inventory updated",
                });
                return;
            }
            else {
                res.status(404).json({
                    success: true,
                    message: "Failed to update inventory",
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
        console.log("Error while updating inventory", error);
        res.status(500).json({
            success: false,
            message: "Failed to update inventory",
        });
    }
});
exports.updateDrugInventory = updateDrugInventory;
const deleteDrugInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { drugInventoryID } = req.params;
        const inventoryByPK = yield drugInventory_1.default.findOne({
            where: {
                drugInventoryID: drugInventoryID,
                softDeleted: false,
            },
        });
        if (inventoryByPK) {
            const softDeleteDosageForm = yield inventoryByPK.update({
                softDeleted: true,
            });
            const allDrugInventories = yield drugInventory_1.default.findAll({
                where: { softDeleted: false },
                order: [["createdAt", "ASC"]],
            });
            let inventoryAlongWithItsDrug = [];
            for (const inventory of allDrugInventories) {
                const findInventoryByPK = yield drugInventory_1.default.findByPk(inventory.drugInventoryID, {
                    include: {
                        model: drugsModel_1.default,
                        as: "drug",
                        where: {
                            drugID: inventory.drugID,
                        },
                    },
                });
                inventoryAlongWithItsDrug.push(findInventoryByPK);
            }
            if (softDeleteDosageForm) {
                res.status(200).json({
                    success: true,
                    message: "Deleted",
                    allInventories: inventoryAlongWithItsDrug,
                });
                return;
            }
            else {
                res.status(200).json({
                    success: true,
                    message: "Failed to delete inventory",
                });
                return;
            }
        }
        else {
            res.status(404).json({
                success: false,
                message: "Inventory not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while deleting inventory", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete inventory",
        });
    }
});
exports.deleteDrugInventory = deleteDrugInventory;
const undoDeletedDrugInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { drugInventoryID } = req.params;
    try {
        const inventoryByID = yield drugInventory_1.default.findOne({
            where: {
                drugInventoryID: drugInventoryID,
                softDeleted: true,
            },
        });
        if (inventoryByID) {
            const undoSoftDeletedInventory = yield inventoryByID.update({
                softDeleted: false,
            });
            if (undoSoftDeletedInventory) {
                const allDeletedInventories = yield drugInventory_1.default.findAll({
                    where: {
                        softDeleted: true,
                    },
                    order: [["createdAt", "ASC"]],
                });
                let inventoryAlongWithItsDrug = [];
                for (const inventory of allDeletedInventories) {
                    const findInventoryByPK = yield drugInventory_1.default.findByPk(inventory.drugInventoryID, {
                        include: {
                            model: drugsModel_1.default,
                            as: "drug",
                            where: {
                                drugID: inventory.drugID,
                            },
                        },
                    });
                    inventoryAlongWithItsDrug.push(findInventoryByPK);
                }
                res.status(200).json({
                    success: true,
                    message: "Inventory restored",
                    allInventories: inventoryAlongWithItsDrug,
                });
                return;
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Failed to restore Inventory",
                });
                return;
            }
        }
        else {
            res.status(404).json({
                success: false,
                message: "Inventory not found",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while restoring Inventory", error);
        res.status(500).json({
            success: false,
            message: "Failed to restore Inventory",
        });
    }
});
exports.undoDeletedDrugInventory = undoDeletedDrugInventory;
const fetchAllDeletedDrugInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDeletedInventories = yield drugInventory_1.default.findAll({
            where: {
                softDeleted: true,
            },
            order: [["createdAt", "ASC"]],
        });
        let inventoryAlongWithItsDrug = [];
        for (const inventory of allDeletedInventories) {
            const findInventoryByPK = yield drugInventory_1.default.findByPk(inventory.drugInventoryID, {
                include: {
                    model: drugsModel_1.default,
                    as: "drug",
                    where: {
                        drugID: inventory.drugID,
                    },
                },
            });
            inventoryAlongWithItsDrug.push(findInventoryByPK);
        }
        if (allDeletedInventories) {
            res.status(200).json({
                success: true,
                allInventories: inventoryAlongWithItsDrug,
            });
            return;
        }
        else {
            res.status(200).json({
                success: true,
                message: "No deleted inventories",
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch deleted inventories",
        });
    }
});
exports.fetchAllDeletedDrugInventory = fetchAllDeletedDrugInventory;
