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
export const findDrugClassByUUID = async (req: Request, res: Response) => {
  try {
    const { drugClassID } = req.params;
    const findDrugClassByPK = await DRUG_CLASS.findByPk(drugClassID);

    if (findDrugClassByPK && !findDrugClassByPK.softDeleted) {
      res.status(200).json({
        success: true,
        findDrugClassByPK: findDrugClassByPK,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Drug class not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while finding drug class", error);
    res.status(500).json({
      success: false,
      message: "Failed to find drug class by UUID",
    });
  }
};
export const updateDrugClass = async (req: Request, res: Response) => {
  try {
    const { drugClassID } = req.params;
    const { drugClass } = req.body;
    const findDrugClassByPK = await DRUG_CLASS.findByPk(drugClassID);

    if (findDrugClassByPK && findDrugClassByPK.drugClass !== drugClass) {
      const updateDrugClass = await findDrugClassByPK.update({
        drugClass: drugClass,
      });
      const findAllDrugClass = await DRUG_CLASS.findAll({
        where: { softDeleted: false },
        order: [["drugClass", "ASC"]],
      });
      if (updateDrugClass) {
        res.status(200).json({
          success: true,
          updateDrugClass: updateDrugClass,
          findAllDrugClass: findAllDrugClass,
        });
        return;
      } else {
        res.status(404).json({
          success: true,
          message: "Failed to update drug class",
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
    console.log("Error while updating drug class", error);
    res.status(500).json({
      success: false,
      message: "Failed to update drug class",
    });
  }
};

export const deleteDrugClass = async (req: Request, res: Response) => {
  try {
    const { drugClassID } = req.params;
    const findDrugClassByPK = await DRUG_CLASS.findByPk(drugClassID);

    if (findDrugClassByPK) {
      const softDeleteDrugClass = await findDrugClassByPK.update({
        softDeleted: true,
      });
      const findAllDrugClass = await DRUG_CLASS.findAll({
        where: { softDeleted: false },
        order: [["drugClass", "ASC"]],
      });
      if (softDeleteDrugClass) {
        res.status(200).json({
          success: true,
          message: "Deleted",
          findAllDrugClass: findAllDrugClass,
        });
        return;
      } else {
        res.status(200).json({
          success: true,
          message: "Failed to delete drug class",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Drug class not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while deleting drug class", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete drug class",
    });
  }
};
export const undoDeletedDrugClass = async (req: Request, res: Response) => {
  const { drugClassID } = req.params;

  try {
    const findDrugClassByID = await DRUG_CLASS.findByPk(drugClassID);

    if (findDrugClassByID && findDrugClassByID.softDeleted) {
      const softDeleteDrugClass = await findDrugClassByID.update({
        softDeleted: false,
      });

      if (softDeleteDrugClass) {
        const findAllDrugClass = await DRUG_CLASS.findAll({
          where: { softDeleted: false },
          order: [["drugClass", "ASC"]],
        });

        res.status(200).json({
          success: true,
          message: "Drug class restored",
          findAllDrugClass: findAllDrugClass,
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Failed to restore drug class",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Drug class not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while restoring drug class", error);
    res.status(500).json({
      success: false,
      message: "Failed to restore drug class",
    });
  }
};

export const fetchAllDeletedDrugClass = async (req: Request, res: Response) => {
  try {
    const findAllDeletedDrugClass = await DRUG_CLASS.findAll({
      where: {
        softDeleted: true,
      },
      order: [["drugClass", "ASC"]],
    });

    if (findAllDeletedDrugClass) {
      res.status(200).json({
        success: true,
        findAllDeletedDrugClass: findAllDeletedDrugClass,
      });
      return;
    } else {
      res.status(200).json({
        success: true,
        message: "No deleted drug class",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch deleted drug class",
    });
  }
};
