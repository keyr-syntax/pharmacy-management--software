import { Request, Response } from "express";
import DRUG_SAFETY from "../../models/drug_model/drugSafetyModel";
import DRUGS from "../../models/drug_model/drugsModel";

export const addNewDrugSafety = async (req: Request, res: Response) => {
  const {
    drugID,
    contraindications,
    drugInteractions,
    pregnancyCategory,
    maxDailyDose,
  } = req.body;
  try {
    const doesDrugSafetyExist = await DRUG_SAFETY.findOne({
      where: {
        drugID: drugID,
        softDeleted: false,
      },
    });

    if (doesDrugSafetyExist) {
      res.status(400).json({
        success: false,
        message: "Safety information already exists",
      });
      return;
    } else {
      const newDrugSafety = await DRUG_SAFETY.create({
        drugID,
        contraindications,
        drugInteractions,
        pregnancyCategory,
        maxDailyDose,
        softDeleted: false,
      });
      const findAllDrugSafety = await DRUG_SAFETY.findAll({
        where: { softDeleted: false, drugID: drugID },
        order: [["createdAt", "ASC"]],
      });
      if (newDrugSafety) {
        res.status(200).json({
          success: true,
          safety: newDrugSafety,
          allSafety: findAllDrugSafety,
          message: "Drug Safety added",
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Failed to add drug safety",
        });
        return;
      }
    }
  } catch (error) {
    console.log("Error while adding new drug safety", error);
    res.status(500).json({
      success: false,
      message: "Failed to add drug safety",
    });
  }
};

export const findAllDrugSafety = async (req: Request, res: Response) => {
  try {
    const allDrugSafety = await DRUG_SAFETY.findAll({
      where: { softDeleted: false },
      order: [["createdAt", "ASC"]],
    });

    let safetyAlongWithItsDrug = [];

    for (const safety of allDrugSafety) {
      const findSafetyByPK = await DRUG_SAFETY.findByPk(
        safety.drugSafetyID,
        {
          include: {
            model: DRUGS,
            as: "drug",
            where: {
              drugID: safety.drugID,
            },
          },
        }
      );
      safetyAlongWithItsDrug.push(findSafetyByPK);
    }

    if (allDrugSafety) {
      res.status(200).json({
        success: true,
        allDrugSafety: safetyAlongWithItsDrug,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Failed to find drug safety",
      });
      return;
    }
  } catch (error) {
    console.log("Error while finding all drug safety", error);
    res.status(500).json({
      success: false,
      message: "Failed to find drug safety",
    });
  }
};

export const findSafetyByUUID = async (req: Request, res: Response) => {
  try {
    const { safetyID, drugID } = req.params;
    const safetyByPK = await DRUG_SAFETY.findByPk(safetyID, {
      include: {
        model: DRUGS,
        as: "drug",
        where: {
          drugID: drugID,
        },
      },
    });

    if (safetyByPK && !safetyByPK.softDeleted) {
      res.status(200).json({
        success: true,
        safety: safetyByPK,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Safety information not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while finding Safety", error);
    res.status(500).json({
      success: false,
      message: "Failed to find Safety by UUID",
    });
  }
};

export const updateDrugSafety = async (req: Request, res: Response) => {
  try {
    const { safetyID } = req.params;
    const {
      drugID,
      contraindications,
      drugInteractions,
      pregnancyCategory,
      maxDailyDose,
    } = req.body;
    const safetyByPK = await DRUG_SAFETY.findByPk(safetyID);

    const isSafetyTheSame =
      safetyByPK?.drugID === drugID &&
      safetyByPK?.contraindications === contraindications &&
      safetyByPK?.drugInteractions === drugInteractions &&
      safetyByPK?.pregnancyCategory === pregnancyCategory &&
      safetyByPK?.maxDailyDose === maxDailyDose;

    if (safetyByPK && !safetyByPK.softDeleted && !isSafetyTheSame) {
      const updateSafety = await safetyByPK.update({
        drugID: drugID,
        contraindications: contraindications,
        drugInteractions: drugInteractions,
        pregnancyCategory: pregnancyCategory,
        maxDailyDose: maxDailyDose,
      });
      const findAllDrugSafety = await DRUG_SAFETY.findAll({
        where: { softDeleted: false },
        order: [["createdAt", "ASC"]],
      });
      if (updateSafety) {
        res.status(200).json({
          success: true,
          safety: updateSafety,
          allSafety: findAllDrugSafety,
          message: "Safety information updated",
        });
        return;
      } else {
        res.status(404).json({
          success: true,
          message: "Failed to update safety information",
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
    console.log("Error while updating safety information", error);
    res.status(500).json({
      success: false,
      message: "Failed to update safety information",
    });
  }
};

export const deleteDrugSafety = async (req: Request, res: Response) => {
  try {
    const { safetyID } = req.params;
    const safetyByPK = await DRUG_SAFETY.findOne({
      where: {
        drugSafetyID: safetyID,
        softDeleted: false,
      },
    });

    if (safetyByPK) {
      const softDeleteSafety = await safetyByPK.update({
        softDeleted: true,
      });
      const findAllDrugSafety = await DRUG_SAFETY.findAll({
        where: { softDeleted: false },
        order: [["createdAt", "ASC"]],
      });
      if (softDeleteSafety) {
        res.status(200).json({
          success: true,
          message: "Deleted",
          allSafety: findAllDrugSafety,
        });
        return;
      } else {
        res.status(200).json({
          success: true,
          message: "Failed to delete safety information",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Safety information not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while deleting safety information", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete safety information",
    });
  }
};

export const undoDeletedDrugSafety = async (req: Request, res: Response) => {
  const { safetyID } = req.params;
  try {
    const safetyByID = await DRUG_SAFETY.findOne({
      where: {
        drugSafetyID: safetyID,
        softDeleted: true,
      },
    });

    if (safetyByID) {
      const undoSoftDeletedSafety = await safetyByID.update({
        softDeleted: false,
      });

      if (undoSoftDeletedSafety) {
        const findAllSafety = await DRUG_SAFETY.findAll({
          where: {
            softDeleted: true,
          },
          order: [["createdAt", "ASC"]],
        });
        res.status(200).json({
          success: true,
          message: "Safety information restored",
          allSafety: findAllSafety,
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Failed to restore safety information",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Safety information not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while restoring safety information", error);
    res.status(500).json({
      success: false,
      message: "Failed to restore safety information",
    });
  }
};

export const fetchAllDeletedDrugSafety = async (req: Request, res: Response) => {
  try {
    const allDeletedSafety = await DRUG_SAFETY.findAll({
      where: {
        softDeleted: true,
      },
      order: [["createdAt", "ASC"]],
    });

    if (allDeletedSafety) {
      res.status(200).json({
        success: true,
        allSafety: allDeletedSafety,
      });
      return;
    } else {
      res.status(200).json({
        success: true,
        message: "No deleted safety information",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch deleted safety information",
    });
  }
};