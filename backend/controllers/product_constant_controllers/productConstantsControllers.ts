import { Request, Response } from "express";
import { dosageForms } from "../../constants/dosageForms";
import { drugClasses } from "../../constants/drugClass";
import { routesOfDrugAdministration } from "../../constants/routesOfDrugAdministration";
import { storageConditions } from "../../constants/storageConditions";

export const fetchDosageForms = async (req: Request, res: Response) => {
  try {
    if (dosageForms) {
      res.status(200).json({
        success: true,
        allDosageForms: dosageForms,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Failed to fetch dosage forms",
      });
      return;
    }
  } catch (error) {
    console.log("Error while fetching dosage forms", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dosage forms",
    });
  }
};
export const fetchDrugClasses = async (req: Request, res: Response) => {
  try {
    if (drugClasses) {
      res.status(200).json({
        success: true,
        allDrugClasses: drugClasses,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Failed to fetch drug class",
      });
      return;
    }
  } catch (error) {
    console.log("Error while fetching drug class", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch drug class",
    });
  }
};
export const fetchRoutesOfDrugAdministration = async (
  req: Request,
  res: Response
) => {
  try {
    if (routesOfDrugAdministration) {
      res.status(200).json({
        success: true,
        allRoutesOfDrugAdministration: routesOfDrugAdministration,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Failed to fetch routes of drug administration",
      });
      return;
    }
  } catch (error) {
    console.log("Error while fetching routes of drug administration", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch routes of drug administration",
    });
  }
};
export const fetchStorageConditions = async (req: Request, res: Response) => {
  try {
    if (storageConditions) {
      res.status(200).json({
        success: true,
        storageConditions: storageConditions,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Failed to fetch storage conditions",
      });
      return;
    }
  } catch (error) {
    console.log("Error while fetching storage conditions", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch storage conditions",
    });
  }
};
