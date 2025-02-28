import { Request, Response } from "express";
import DRUG_CLASS from "../models/drugClassModel";

export const addNewDrugClass = async (req: Request, res: Response) => {
  const { drugClass } = req.body;
  try {
    const checkIfDrugClassExists = await DRUG_CLASS.findOne({
      where: {
        drugClass: drugClass,
        softDeleted: false,
      },
    });

    if (checkIfDrugClassExists) {
      res.status(400).json({
        success: false,
        message: "Drug class already exists",
      });
      return;
    } else {
      const newDrugClass = await DRUG_CLASS.create({
        drugClass,
        softDeleted: false,
      });
      const findAllDrugClass = await DRUG_CLASS.findAll({
        where: { softDeleted: false },
        order: [["drugClass", "ASC"]],
      });
      if (newDrugClass) {
        res.status(200).json({
          success: true,
          newDrugClass: newDrugClass,
          findAllDrugClass: findAllDrugClass,
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Failed to add drug class",
        });
        return;
      }
    }
  } catch (error) {
    console.log("Error while adding new drug class", error);
    res.status(500).json({
      success: false,
      message: "Failed to add drug class",
    });
  }
};
export const findAllDrugClass = async (req: Request, res: Response) => {
  try {
    const findAllDrugClass = await DRUG_CLASS.findAll({
        where: { softDeleted: false },
        order: [["drugClass", "ASC"]],
      });

    if (findAllDrugClass) {
      res.status(200).json({
        success: true,
        findAllDrugClass: findAllDrugClass,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Failed to find drug class",
      });
      return;
    }
  } catch (error) {
    console.log("Error while finding all drug class", error);
    res.status(500).json({
      success: false,
      message: "Failed to find drug class",
    });
  }
};
export const findDosageFormByUUID = async (req: Request, res: Response) => {
  try {
    const { dosageFormID } = req.params;
    const findDosageFormByPK = await DRUG_DOSAGE_FORM.findByPk(dosageFormID);

    if (findDosageFormByPK && !findDosageFormByPK.softDeleted) {
      res.status(200).json({
        success: true,
        dosageForm: findDosageFormByPK,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Dosage form not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while finding dosage form", error);
    res.status(500).json({
      success: false,
      message: "Failed to find dosage form by UUID",
    });
  }
};
export const updateDosageForm = async (req: Request, res: Response) => {
  try {
    const { dosageFormID } = req.params;
    const { dosageForm } = req.body;
    const findDosageFormByPK = await DRUG_DOSAGE_FORM.findByPk(dosageFormID);

    if (findDosageFormByPK && findDosageFormByPK.dosageForm !== dosageForm) {
      const updateDosageForm = await findDosageFormByPK.update({
        dosageForm: dosageForm,
      });
      const findAllDosageForms = await DRUG_DOSAGE_FORM.findAll({
        where: { softDeleted: false },
        order: [["dosageForm", "ASC"]],
      });
      if (updateDosageForm) {
        res.status(200).json({
          success: true,
          dosageForm: updateDosageForm,
          findAllDosageForms: findAllDosageForms,
        });
        return;
      } else {
        res.status(404).json({
          success: true,
          message: "Failed to update dosage form",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "You have made no changes",
      });
      return;
    }
  } catch (error) {
    console.log("Error while updating dosage forms", error);
    res.status(500).json({
      success: false,
      message: "Failed to update dosage form",
    });
  }
};
export const deleteDosageForm = async (req: Request, res: Response) => {
  try {
    const { dosageFormID } = req.params;
    const findDosageFormByPK = await DRUG_DOSAGE_FORM.findByPk(dosageFormID);

    if (findDosageFormByPK) {
      const softDeleteDosageForm = await findDosageFormByPK.update({
        softDeleted: true,
      });
      const findAllDosageForms = await DRUG_DOSAGE_FORM.findAll({
        where: { softDeleted: false },
        order: [["dosageForm", "ASC"]],
      });
      if (softDeleteDosageForm) {
        res.status(200).json({
          success: true,
          message: "Deleted",
          findAllDosageForms: findAllDosageForms,
        });
        return;
      } else {
        res.status(200).json({
          success: true,
          message: "Failed to delete dosage form",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Dosage form not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while deleting dosage form", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete dosage form",
    });
  }
};
export const undoDeletedDosageForm = async (req: Request, res: Response) => {
  const { dosageFormID } = req.params;

  try {
    const findDosageFormByID = await DRUG_DOSAGE_FORM.findByPk(dosageFormID);

    if (findDosageFormByID && findDosageFormByID.softDeleted) {
      const softDeleteDosageForm = await findDosageFormByID.update({
        softDeleted: false,
      });

      if (softDeleteDosageForm) {
        const findAllDosageForm = await DRUG_DOSAGE_FORM.findAll({
          where: {
            softDeleted: true,
          },
          order: [["dosageForm", "ASC"]],
        });
        res.status(200).json({
          success: true,
          message: "Dosage form restored",
          findAllDosageForm: findAllDosageForm,
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Failed to restore dosage form",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Dosage form not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while restoring dosage form", error);
    res.status(500).json({
      success: false,
      message: "Failed to restore dosage form",
    });
  }
};
export const fetchAllDeletedDosageForms = async (
  req: Request,
  res: Response
) => {
  try {
    const findAllDeletedDosageForms = await DRUG_DOSAGE_FORM.findAll({
      where: {
        softDeleted: true,
      },
      order: [["dosageForm", "ASC"]],
    });

    if (findAllDeletedDosageForms) {
      res.status(200).json({
        success: true,
        findAllDeletedDosageForms: findAllDeletedDosageForms,
      });
      return;
    } else {
      res.status(200).json({
        success: true,
        message: "No deleted dosage forms",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch deleted dosage forms",
    });
  }
};
 