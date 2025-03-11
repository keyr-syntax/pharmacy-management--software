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
const sequelize_1 = require("sequelize");
const dbMySQLconfig_1 = require("../../config/dbMySQLconfig");
const bcrypt_1 = __importDefault(require("bcrypt"));
class pharmacyUser extends sequelize_1.Model {
}
pharmacyUser.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        unique: false,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "pharmacist",
    },
    isBlocked: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "Not Blocked",
    },
    SoftDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: dbMySQLconfig_1.sequelize,
    modelName: "pharmacyUser",
    tableName: "pharmacyUser",
    hooks: {
        beforeCreate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            user.password = yield bcrypt_1.default.hash(user.password, 10);
        }),
    },
    timestamps: true,
});
exports.default = pharmacyUser;
