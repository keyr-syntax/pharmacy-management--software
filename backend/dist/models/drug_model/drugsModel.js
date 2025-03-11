"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbMySQLconfig_1 = require("../../config/dbMySQLconfig");
class DRUGS extends sequelize_1.Model {
}
DRUGS.init({
    drugID: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
    },
    genericName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    brandName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    dosageForm: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    drugType: {
        type: sequelize_1.DataTypes.ENUM("OTC", "Prescription"),
        allowNull: false,
    },
    dosageStrength: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    routeOfDrugAdministration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    unitsPerPack: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    drugClass: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("Active", "Discontinued", "Out of Stock"),
        allowNull: false,
        defaultValue: "Active",
    },
    softDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: dbMySQLconfig_1.sequelize,
    modelName: "DRUGS",
    tableName: "DRUGS",
    timestamps: true,
});
exports.default = DRUGS;
