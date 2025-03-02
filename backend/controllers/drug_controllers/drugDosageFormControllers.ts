import { Request, Response } from "express";
import DRUG_DOSAGE_FORM from "../../models/drug_model/dosageFormModel";

export const addNewDrugDosageForm = async (req: Request, res: Response) => {
  const { dosageForm } = req.body;
  try {
    const doesDosageFormExist = await DRUG_DOSAGE_FORM.findOne({
      where: {
        dosageForm: dosageForm,
        softDeleted: false,
      },
    });

    if (doesDosageFormExist) {
      res.status(400).json({
        success: false,
        message: "Dosage Form already exists",
      });
      return;
    } else {
      const newDosageForm = await DRUG_DOSAGE_FORM.create({
        dosageForm,
        softDeleted: false,
      });
      const findAllDosageForms = await DRUG_DOSAGE_FORM.findAll({
        where: { softDeleted: false },
        order: [["dosageForm", "ASC"]],
      });
      if (newDosageForm) {
        res.status(200).json({
          success: true,
          dosageForm: newDosageForm,
          allDosageForms: findAllDosageForms,
          message: "Dosage form added",
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Failed to add dosage form",
        });
        return;
      }
    }
  } catch (error) {
    console.log("Error while adding new dosage form", error);
    res.status(500).json({
      success: false,
      message: "Failed to add dosage form",
    });
  }
};
export const findAllDrugDosageForms = async (req: Request, res: Response) => {
  try {
    const findAllDosageForms = await DRUG_DOSAGE_FORM.findAll({
      where: { softDeleted: false },
      order: [["dosageForm", "ASC"]],
    });

    if (findAllDosageForms) {
      res.status(200).json({
        success: true,
        allDosageForms: findAllDosageForms,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Failed to find dosage forms",
      });
      return;
    }
  } catch (error) {
    console.log("Error while finding all dosage forms", error);
    res.status(500).json({
      success: false,
      message: "Failed to find dosage forms",
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
        message: "Dosage form added",
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
          allDosageForms: findAllDosageForms,
          message: "Dosage form updated",
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
          allDosageForms: findAllDosageForms,
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
          allDosageForm: findAllDosageForm,
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
        allDeletedDosageForms: findAllDeletedDosageForms,
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
