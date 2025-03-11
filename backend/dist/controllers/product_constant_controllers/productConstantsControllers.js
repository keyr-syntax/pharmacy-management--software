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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStorageConditions = exports.fetchRoutesOfDrugAdministration = exports.fetchDrugClasses = exports.fetchDosageForms = void 0;
const dosageForms_1 = require("../../constants/dosageForms");
const drugClass_1 = require("../../constants/drugClass");
const routesOfDrugAdministration_1 = require("../../constants/routesOfDrugAdministration");
const storageConditions_1 = require("../../constants/storageConditions");
const fetchDosageForms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (dosageForms_1.dosageForms) {
            res.status(200).json({
                success: true,
                allDosageForms: dosageForms_1.dosageForms,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Failed to fetch dosage forms",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while fetching dosage forms", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch dosage forms",
        });
    }
});
exports.fetchDosageForms = fetchDosageForms;
const fetchDrugClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (drugClass_1.drugClasses) {
            res.status(200).json({
                success: true,
                allDrugClasses: drugClass_1.drugClasses,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Failed to fetch drug class",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while fetching drug class", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch drug class",
        });
    }
});
exports.fetchDrugClasses = fetchDrugClasses;
const fetchRoutesOfDrugAdministration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (routesOfDrugAdministration_1.routesOfDrugAdministration) {
            res.status(200).json({
                success: true,
                allRoutesOfDrugAdministration: routesOfDrugAdministration_1.routesOfDrugAdministration,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Failed to fetch routes of drug administration",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while fetching routes of drug administration", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch routes of drug administration",
        });
    }
});
exports.fetchRoutesOfDrugAdministration = fetchRoutesOfDrugAdministration;
const fetchStorageConditions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (storageConditions_1.storageConditions) {
            res.status(200).json({
                success: true,
                storageConditions: storageConditions_1.storageConditions,
            });
            return;
        }
        else {
            res.status(404).json({
                success: false,
                message: "Failed to fetch storage conditions",
            });
            return;
        }
    }
    catch (error) {
        console.log("Error while fetching storage conditions", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch storage conditions",
        });
    }
});
exports.fetchStorageConditions = fetchStorageConditions;
