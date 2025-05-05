import { Request, Response } from "express";
import DRUG_PRICING from "../../models/drug_model/drugPricingModel";
import DRUGS from "../../models/drug_model/drugsModel";

export const addNewDrugPricing = async (req: Request, res: Response) => {
  const {
    drugID,
    purchasePrice,
    sellingPrice,
    taxRate,
    margin,
    insuranceCoverage,
  } = req.body;

  // validation

  try {
    const doesDrugPricingExist = await DRUG_PRICING.findOne({
      where: {
        drugID: drugID,
        softDeleted: false,
      },
    });

    if (doesDrugPricingExist) {
      res.status(400).json({
        success: false,
        message: "Pricing already exists",
      });
      return;
    } else {
      const newDrugPricing = await DRUG_PRICING.create({
        drugID,
        purchasePrice,
        sellingPrice,
        taxRate,
        margin,
        insuranceCoverage,
        softDeleted: false,
      });
      const findAllDrugPricing = await DRUG_PRICING.findAll({
        where: { softDeleted: false, drugID: drugID },
        order: [["createdAt", "ASC"]],
      });
      if (newDrugPricing) {
        res.status(200).json({
          success: true,
          pricing: newDrugPricing,
          allPricing: findAllDrugPricing,
          message: "Drug Pricing added",
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Failed to add drug pricing",
        });
        return;
      }
    }
  } catch (error) {
    console.log("Error while adding new drug pricing", error);
    res.status(500).json({
      success: false,
      message: "Failed to add drug pricing",
    });
  }
};
export const findAllDrugPricing = async (req: Request, res: Response) => {
  try {
    const allDrugPricing = await DRUG_PRICING.findAll({
      where: { softDeleted: false },
      order: [["createdAt", "ASC"]],
    });

    let pricingAlongWithItsDrug = [];

    for (const pricing of allDrugPricing) {
      const findPricingByPK = await DRUG_PRICING.findByPk(pricing.pricingID, {
        include: {
          model: DRUGS,
          as: "drug",
          where: {
            drugID: pricing.drugID,
          },
        },
      });
      pricingAlongWithItsDrug.push(findPricingByPK);
    }

    if (allDrugPricing) {
      res.status(200).json({
        success: true,
        allDrugPricing: pricingAlongWithItsDrug,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Failed to find drug pricing",
      });
      return;
    }
  } catch (error) {
    console.log("Error while finding all drug pricing", error);
    res.status(500).json({
      success: false,
      message: "Failed to find drug pricing",
    });
  }
};
export const findPricingByUUID = async (req: Request, res: Response) => {
  try {
    const { pricingID } = req.params;
    const pricingByPK = await DRUG_PRICING.findByPk(pricingID);

    if (pricingByPK && !pricingByPK.softDeleted) {
      res.status(200).json({
        success: true,
        pricing: pricingByPK,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Pricing not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while finding Pricing", error);
    res.status(500).json({
      success: false,
      message: "Failed to find Pricing by UUID",
    });
  }
};

export const updateDrugPricing = async (req: Request, res: Response) => {
  try {
    const { pricingID } = req.params;
    const {
      drugID,
      purchasePrice,
      sellingPrice,
      taxRate,
      margin,
      insuranceCoverage,
    } = req.body;
    const pricingByPK = await DRUG_PRICING.findByPk(pricingID);

    const isPricingTheSame =
      pricingByPK?.drugID === drugID &&
      pricingByPK?.purchasePrice === purchasePrice &&
      pricingByPK?.sellingPrice === sellingPrice &&
      pricingByPK?.taxRate === taxRate &&
      pricingByPK?.margin === margin &&
      pricingByPK?.insuranceCoverage === insuranceCoverage;

    if (pricingByPK && !pricingByPK.softDeleted && !isPricingTheSame) {
      const updatePricing = await pricingByPK.update({
        drugID: drugID,
        purchasePrice: purchasePrice,
        sellingPrice: sellingPrice,
        taxRate: taxRate,
        margin: margin,
        insuranceCoverage: insuranceCoverage,
      });

      if (updatePricing) {
        res.status(200).json({
          success: true,
          pricing: updatePricing,
          message: "Pricing updated",
        });
        return;
      } else {
        res.status(404).json({
          success: true,
          message: "Failed to update pricing",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: true,
        message: "You have made no changes",
      });
      return;
    }
  } catch (error) {
    console.log("Error while updating pricing", error);
    res.status(500).json({
      success: false,
      message: "Failed to update pricing",
    });
  }
};

export const deleteDrugPricing = async (req: Request, res: Response) => {
  try {
    const { pricingID } = req.params;
    const pricingByPK = await DRUG_PRICING.findOne({
      where: {
        pricingID: pricingID,
        softDeleted: false,
      },
    });

    if (pricingByPK) {
      const softDeletePricing = await pricingByPK.update({
        softDeleted: true,
      });
      const allDrugPricing = await DRUG_PRICING.findAll({
        where: { softDeleted: false },
        order: [["createdAt", "ASC"]],
      });

      let pricingAlongWithItsDrug = [];

      for (const pricing of allDrugPricing) {
        const findPricingByPK = await DRUG_PRICING.findByPk(pricing.pricingID, {
          include: {
            model: DRUGS,
            as: "drug",
            where: {
              drugID: pricing.drugID,
            },
          },
        });
        pricingAlongWithItsDrug.push(findPricingByPK);
      }
      if (softDeletePricing) {
        res.status(200).json({
          success: true,
          message: "Deleted",
          allPricing: pricingAlongWithItsDrug,
        });
        return;
      } else {
        res.status(200).json({
          success: true,
          message: "Failed to delete pricing",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Pricing not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while deleting pricing", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete pricing",
    });
  }
};

export const undoDeletedDrugPricing = async (req: Request, res: Response) => {
  const { pricingID } = req.params;
  try {
    const pricingByID = await DRUG_PRICING.findOne({
      where: {
        pricingID: pricingID,
        softDeleted: true,
      },
    });

    if (pricingByID) {
      const undoSoftDeletedPricing = await pricingByID.update({
        softDeleted: false,
      });

      if (undoSoftDeletedPricing) {
        const findAllPricing = await DRUG_PRICING.findAll({
          where: {
            softDeleted: true,
          },
          order: [["createdAt", "ASC"]],
        });
        let pricingAlongWithItsDrug = [];

        for (const pricing of findAllPricing) {
          const findPricingByPK = await DRUG_PRICING.findByPk(
            pricing.pricingID,
            {
              include: {
                model: DRUGS,
                as: "drug",
                where: {
                  drugID: pricing.drugID,
                },
              },
            }
          );
          pricingAlongWithItsDrug.push(findPricingByPK);
        }
        res.status(200).json({
          success: true,
          message: "Pricing restored",
          allPricing: pricingAlongWithItsDrug,
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Failed to restore Pricing",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Pricing not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while restoring Pricing", error);
    res.status(500).json({
      success: false,
      message: "Failed to restore Pricing",
    });
  }
};

export const fetchAllDeletedDrugPricing = async (
  req: Request,
  res: Response
) => {
  try {
    const allDeletedPricing = await DRUG_PRICING.findAll({
      where: {
        softDeleted: true,
      },
      order: [["createdAt", "ASC"]],
    });
    let pricingAlongWithItsDrug = [];

    for (const pricing of allDeletedPricing) {
      const findPricingByPK = await DRUG_PRICING.findByPk(pricing.pricingID, {
        include: {
          model: DRUGS,
          as: "drug",
          where: {
            drugID: pricing.drugID,
          },
        },
      });
      pricingAlongWithItsDrug.push(findPricingByPK);
    }
    if (allDeletedPricing) {
      res.status(200).json({
        success: true,
        allPricing: pricingAlongWithItsDrug,
      });
      return;
    } else {
      res.status(200).json({
        success: true,
        message: "No deleted pricing",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch deleted pricing",
    });
  }
};
