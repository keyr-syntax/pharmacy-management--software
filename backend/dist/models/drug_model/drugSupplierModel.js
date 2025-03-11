"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbMySQLconfig_1 = require("../../config/dbMySQLconfig");
class DRUG_SUPPLIER extends sequelize_1.Model {
}
DRUG_SUPPLIER.init({
    supplierID: {
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
    supplierName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    contactPersonName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    supplierEmail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    supplierPhoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    supplierAddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    licenseNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    softDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: dbMySQLconfig_1.sequelize,
    modelName: "DRUG_SUPPLIER",
    tableName: "DRUG_SUPPLIER",
    timestamps: true,
});
exports.default = DRUG_SUPPLIER;
