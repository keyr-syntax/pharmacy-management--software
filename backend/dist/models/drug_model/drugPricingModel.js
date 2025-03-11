"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbMySQLconfig_1 = require("../../config/dbMySQLconfig");
class DRUG_PRICING extends sequelize_1.Model {
}
DRUG_PRICING.init({
    pricingID: {
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
    purchasePrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    sellingPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    taxRate: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    margin: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    insuranceCoverage: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    softDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
}, {
    sequelize: dbMySQLconfig_1.sequelize,
    modelName: "DRUG_PRICING",
    tableName: "DRUG_PRICING",
    timestamps: true,
});
exports.default = DRUG_PRICING;
