import { Request, Response } from "express";
import DRUGS from "../../models/drug_model/drugsModel";
import DRUG_MANUFACTURERS from "../../models/drug_model/drugManufacturersModel";

export const addNewDrug = async (req: Request, res: Response) => {
  const {
    genericName,
    brandName,
    dosageForm,
    drugType,
    dosageStrength,
    routeOfDrugAdministration,
    unitsPerPack,
    drugClass,
    manufacturerID,
    status,
  } = req.body;

  if (
    !genericName ||
    genericName.trim() === "" ||
    !brandName ||
    brandName.trim() === "" ||
    !dosageForm ||
    dosageForm.trim() === "" ||
    !drugType ||
    drugType.trim() === "" ||
    !dosageStrength ||
    dosageStrength.trim() === "" ||
    !unitsPerPack ||
    !drugClass ||
    drugClass.trim() === "" ||
    !manufacturerID ||
    manufacturerID.trim() === "" ||
    !status ||
    status.trim() === "" ||
    !routeOfDrugAdministration ||
    routeOfDrugAdministration.trim() === ""
  ) {
    res.status(400).json({
      success: false,
      message: "All fields are required",
    });
    return;
  }

  try {
    const checkIfDrugExists = await DRUGS.findOne({
      where: {
        genericName: genericName,
        brandName: brandName,
        softDeleted: false,
      },
    });

    if (checkIfDrugExists) {
      res.status(400).json({
        success: false,
        message: "Drug already exists",
      });
      return;
    } else {
      const newDrug = await DRUGS.create({
        genericName,
        brandName,
        dosageForm,
        drugType,
        dosageStrength,
        routeOfDrugAdministration,
        unitsPerPack,
        drugClass,
        manufacturerID,
        status,
        softDeleted: false,
      });
      const findAllDrugs = await DRUGS.findAll({
        where: { softDeleted: false },
        order: [["genericName", "ASC"]],
      });
      if (newDrug) {
        res.status(200).json({
          success: true,
          newDrug: newDrug,
          allDrugs: findAllDrugs,
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Failed to add drug",
        });
        return;
      }
    }
  } catch (error) {
    console.log("Error while adding new drug", error);
    res.status(500).json({
      success: false,
      message: "Failed to add drug",
    });
  }
};
export const findAllDrugs = async (req: Request, res: Response) => {
  try {
    const findAllDrugs = await DRUGS.findAll({
      where: { softDeleted: false },
      order: [["genericName", "ASC"]],
    });

    if (findAllDrugs) {
      res.status(200).json({
        success: true,
        allDrugs: findAllDrugs,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Failed to find drugs",
      });
      return;
    }
  } catch (error) {
    console.log("Error while finding drugs", error);
    res.status(500).json({
      success: false,
      message: "Failed to find drugs",
    });
  }
};
export const findDrugByUUID = async (req: Request, res: Response) => {
  try {
    const { drugID } = req.params;
    const findDrugByPK = await DRUGS.findByPk(drugID);
    if (findDrugByPK && !findDrugByPK.softDeleted) {
      const drugDetails = await DRUGS.findByPk(drugID, {
        include: [
          {
            model: DRUG_MANUFACTURERS,
            as: "manufacturer",
            where: {
              manufacturerID: findDrugByPK.manufacturerID,
            },
          },
          {
            model: DRUG_MANUFACTURERS,
            as: "manufacturer",
            where: {
              manufacturerID: findDrugByPK.manufacturerID,
            },
          },
        ],
      });

      res.status(200).json({
        success: true,
        drug: drugDetails,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Drug not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while finding drug", error);
    res.status(500).json({
      success: false,
      message: "Failed to find drug by UUID",
    });
  }
};
export const updateDrugDetails = async (req: Request, res: Response) => {
  try {
    const { drugID } = req.params;
    const {
      genericName,
      brandName,
      dosageForm,
      drugType,
      dosageStrength,
      routeOfDrugAdministration,
      unitsPerPack,
      drugClass,
      manufacturerID,
      status,
    } = req.body;
    const findDrugByPK = await DRUGS.findOne({
      where: {
        drugID: drugID,
        softDeleted: false,
      },
    });

    const areDetailsTheSame =
      findDrugByPK?.genericName === genericName &&
      findDrugByPK?.brandName === brandName &&
      findDrugByPK?.dosageForm === dosageForm &&
      findDrugByPK?.drugType === drugType &&
      findDrugByPK?.dosageStrength === dosageStrength &&
      findDrugByPK?.routeOfDrugAdministration === routeOfDrugAdministration &&
      findDrugByPK?.unitsPerPack === unitsPerPack &&
      findDrugByPK?.drugClass === drugClass &&
      findDrugByPK?.manufacturerID === manufacturerID &&
      findDrugByPK?.status === status;

    if (findDrugByPK && !areDetailsTheSame) {
      const updateDrugDetails = await findDrugByPK?.update({
        genericName: genericName,
        brandName: brandName,
        dosageForm: dosageForm,
        drugType: drugType,
        dosageStrength: dosageStrength,
        routeOfDrugAdministration: routeOfDrugAdministration,
        unitsPerPack: unitsPerPack,
        drugClass: drugClass,
        manufacturerID: manufacturerID,
        status: status,
      });
      const findAllDrugs = await DRUGS.findAll({
        where: { softDeleted: false },
        order: [["genericName", "ASC"]],
      });
      if (updateDrugDetails) {
        res.status(200).json({
          success: true,
          drug: updateDrugDetails,
          allDrugs: findAllDrugs,
        });
        return;
      } else {
        res.status(404).json({
          success: true,
          message: "Failed to update drug details",
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
    console.log("Error while updating drug details", error);
    res.status(500).json({
      success: false,
      message: "Failed to update drug details",
    });
  }
};
export const deleteDrug = async (req: Request, res: Response) => {
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

// export const undoDeletedDosageForm = async (req: Request, res: Response) => {
//   const { dosageFormID } = req.params;

//   try {
//     const findDosageFormByID = await DRUG_DOSAGE_FORM.findByPk(dosageFormID);

//     if (findDosageFormByID && findDosageFormByID.softDeleted) {
//       const softDeleteDosageForm = await findDosageFormByID.update({
//         softDeleted: false,
//       });

//       if (softDeleteDosageForm) {
//         const findAllDosageForm = await DRUG_DOSAGE_FORM.findAll({
//           where: {
//             softDeleted: true,
//           },
//           order: [["dosageForm", "ASC"]],
//         });
//         res.status(200).json({
//           success: true,
//           message: "Dosage form restored",
//           findAllDosageForm: findAllDosageForm,
//         });
//         return;
//       } else {
//         res.status(404).json({
//           success: false,
//           message: "Failed to restore dosage form",
//         });
//         return;
//       }
//     } else {
//       res.status(404).json({
//         success: false,
//         message: "Dosage form not found",
//       });
//       return;
//     }
//   } catch (error) {
//     console.log("Error while restoring dosage form", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to restore dosage form",
//     });
//   }
// };

// export const fetchAllDeletedDosageForms = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const findAllDeletedDosageForms = await DRUG_DOSAGE_FORM.findAll({
//       where: {
//         softDeleted: true,
//       },
//       order: [["dosageForm", "ASC"]],
//     });

//     if (findAllDeletedDosageForms) {
//       res.status(200).json({
//         success: true,
//         findAllDeletedDosageForms: findAllDeletedDosageForms,
//       });
//       return;
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "No deleted dosage forms",
//       });
//       return;
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch deleted dosage forms",
//     });
//   }
// };
