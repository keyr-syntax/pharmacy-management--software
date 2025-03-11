"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbMySQLconfig_1 = require("../../config/dbMySQLconfig");
class DRUG_SAFETY extends sequelize_1.Model {
}
DRUG_SAFETY.init({
    drugSafetyID: {
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
    contraindications: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    drugInteractions: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    pregnancyCategory: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    maxDailyDose: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    softDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: dbMySQLconfig_1.sequelize,
    modelName: "DRUG_SAFETY",
    tableName: "DRUG_SAFETY",
    timestamps: true,
});
exports.default = DRUG_SAFETY;
