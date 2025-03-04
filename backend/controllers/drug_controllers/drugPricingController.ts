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