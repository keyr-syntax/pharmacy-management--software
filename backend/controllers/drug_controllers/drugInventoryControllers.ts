import { Request, Response } from "express";
import DRUG_INVENTORY from "../../models/drug_model/drugInventory";
import DRUGS from "../../models/drug_model/drugsModel";

export const addNewDrugInventory = async (req: Request, res: Response) => {
  const {
    drugID,
    batchNumber,
    barCode,
    storageConditions,
    location,
    expiryDate,
    quantityInStock,
    minimumQuantityInStock,
    reorderStockLevel,
  } = req.body;
  try {
    const doesDrugInventoryExist = await DRUG_INVENTORY.findOne({
      where: {
        drugID: drugID,
        batchNumber: batchNumber,
        softDeleted: false,
      },
    });

    if (doesDrugInventoryExist) {
      res.status(400).json({
        success: false,
        message: "Inventory already exists",
      });
      return;
    } else {
      const newDrugInventory = await DRUG_INVENTORY.create({
        drugID,
        batchNumber,
        barCode,
        storageConditions,
        location,
        expiryDate,
        quantityInStock,
        minimumQuantityInStock,
        reorderStockLevel,
        softDeleted: false,
      });
      const findAllDrugInventories = await DRUG_INVENTORY.findAll({
        where: { softDeleted: false, drugID: drugID },
        order: [["createdAt", "ASC"]],
      });
      if (newDrugInventory) {
        res.status(200).json({
          success: true,
          inventory: newDrugInventory,
          allInventories: findAllDrugInventories,
          message: "Drug Inventory added",
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Failed to add drug inventory",
        });
        return;
      }
    }
  } catch (error) {
    console.log("Error while adding new drug inventory", error);
    res.status(500).json({
      success: false,
      message: "Failed to add drug inventory",
    });
  }
};
export const findAllDrugInventories = async (req: Request, res: Response) => {
  try {
    const allDrugInventories = await DRUG_INVENTORY.findAll({
      where: { softDeleted: false },
      order: [["createdAt", "ASC"]],
    });

    let inventoryAlongWithItsDrug = [];

    for (const inventory of allDrugInventories) {
      const findInventoryByPK = await DRUG_INVENTORY.findByPk(
        inventory.drugInventoryID,
        {
          include: {
            model: DRUGS,
            as: "drug",
            where: {
              drugID: inventory.drugID,
            },
          },
        }
      );
      inventoryAlongWithItsDrug.push(findInventoryByPK);
    }

    if (allDrugInventories) {
      res.status(200).json({
        success: true,
        allDrugInventories: inventoryAlongWithItsDrug,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Failed to find drug inventory",
      });
      return;
    }
  } catch (error) {
    console.log("Error while finding all drug inventories", error);
    res.status(500).json({
      success: false,
      message: "Failed to find drug inventory",
    });
  }
};
export const findInventoryByUUID = async (req: Request, res: Response) => {
  try {
    const { drugInventoryID, drugID } = req.params;
    const inventoryByPK = await DRUG_INVENTORY.findByPk(drugInventoryID, {
      include: {
        model: DRUGS,
        as: "drug",
        where: {
          drugID: drugID,
        },
      },
    });

    if (inventoryByPK && !inventoryByPK.softDeleted) {
      res.status(200).json({
        success: true,
        inventory: inventoryByPK,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while finding Inventory", error);
    res.status(500).json({
      success: false,
      message: "Failed to find Inventory by UUID",
    });
  }
};
export const updateDrugInventory = async (req: Request, res: Response) => {
  try {
    const { drugInventoryID } = req.params;
    const {
      drugID,
      batchNumber,
      barCode,
      storageConditions,
      location,
      expiryDate,
      quantityInStock,
      minimumQuantityInStock,
      reorderStockLevel,
    } = req.body;
    const inventoryByPK = await DRUG_INVENTORY.findByPk(drugInventoryID);

    const isInventoryTheSame =
      inventoryByPK?.drugID === drugID &&
      inventoryByPK?.batchNumber === batchNumber &&
      inventoryByPK?.barCode === barCode &&
      inventoryByPK?.storageConditions === storageConditions &&
      inventoryByPK?.location === location &&
      inventoryByPK?.expiryDate === expiryDate &&
      inventoryByPK?.quantityInStock === quantityInStock &&
      inventoryByPK?.minimumQuantityInStock === minimumQuantityInStock &&
      inventoryByPK?.reorderStockLevel === reorderStockLevel;

    if (inventoryByPK && !inventoryByPK.softDeleted && !isInventoryTheSame) {
      const updateInventory = await inventoryByPK.update({
        drugID: drugID,
        batchNumber: batchNumber,
        barCode: barCode,
        storageConditions: storageConditions,
        location: location,
        expiryDate: expiryDate,
        quantityInStock: quantityInStock,
        minimumQuantityInStock: minimumQuantityInStock,
        reorderStockLevel: reorderStockLevel,
      });
      const findAllDrugInventories = await DRUG_INVENTORY.findAll({
        where: { softDeleted: false },
        order: [["createdAt", "ASC"]],
      });
      if (updateInventory) {
        res.status(200).json({
          success: true,
          inventory: updateInventory,
          allInventories: findAllDrugInventories,
          message: "Inventory updated",
        });
        return;
      } else {
        res.status(404).json({
          success: true,
          message: "Failed to update inventory",
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
    console.log("Error while updating inventory", error);
    res.status(500).json({
      success: false,
      message: "Failed to update inventory",
    });
  }
};
export const deleteDrugInventory = async (req: Request, res: Response) => {
  try {
    const { drugInventoryID } = req.params;
    const inventoryByPK = await DRUG_INVENTORY.findOne({
      where: {
        drugInventoryID: drugInventoryID,
        softDeleted: false,
      },
    });

    if (inventoryByPK) {
      const softDeleteDosageForm = await inventoryByPK.update({
        softDeleted: true,
      });
      const findAllDrugInventories = await DRUG_INVENTORY.findAll({
        where: { softDeleted: false },
        order: [["createdAt", "ASC"]],
      });
      if (softDeleteDosageForm) {
        res.status(200).json({
          success: true,
          message: "Deleted",
          allInventories: findAllDrugInventories,
        });
        return;
      } else {
        res.status(200).json({
          success: true,
          message: "Failed to delete inventory",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while deleting inventory", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete inventory",
    });
  }
};

export const undoDeletedDrugInventory = async (req: Request, res: Response) => {
  const { drugInventoryID } = req.params;
  try {
    const inventoryByID = await DRUG_INVENTORY.findOne({
      where: {
        drugInventoryID: drugInventoryID,
        softDeleted: true,
      },
    });

    if (inventoryByID) {
      const undoSoftDeletedInventory = await inventoryByID.update({
        softDeleted: false,
      });

      if (undoSoftDeletedInventory) {
        const findAllInventories = await DRUG_INVENTORY.findAll({
          where: {
            softDeleted: true,
          },
          order: [["createdAt", "ASC"]],
        });
        res.status(200).json({
          success: true,
          message: "Inventory restored",
          allInventories: findAllInventories,
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Failed to restore Inventory",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while restoring Inventory", error);
    res.status(500).json({
      success: false,
      message: "Failed to restore Inventory",
    });
  }
};
// export const fetchAllDeletedDosageForms = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const findAllDeletedDosageForms = await DRUG_INVENTORY.findAll({
//       where: {
//         softDeleted: true,
//       },
//       order: [["dosageForm", "ASC"]],
//     });

//     if (findAllDeletedDosageForms) {
//       res.status(200).json({
//         success: true,
//         allDeletedDosageForms: findAllDeletedDosageForms,
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
