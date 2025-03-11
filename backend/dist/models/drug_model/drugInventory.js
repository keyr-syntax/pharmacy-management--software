"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbMySQLconfig_1 = require("../../config/dbMySQLconfig");
class DRUG_INVENTORY extends sequelize_1.Model {
}
DRUG_INVENTORY.init({
    drugInventoryID: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
    },
    drugID: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "DRUGS",
            key: "drugID",
        },
    },
    batchNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    storageConditions: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    barCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    quantityInStock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    minimumQuantityInStock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    reorderStockLevel: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    expiryDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    softDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: dbMySQLconfig_1.sequelize,
    modelName: "DRUG_INVENTORY",
    tableName: "DRUG_INVENTORY",
    timestamps: true,
});
exports.default = DRUG_INVENTORY;
