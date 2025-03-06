import { Request, Response } from "express";
import DRUG_SUPPLIER from "../../models/drug_model/drugSupplierModel";

export const addNewDrugSupplier = async (req: Request, res: Response) => {
  const {
    supplierName,
    contactPersonName,
    supplierEmail,
    supplierPhoneNumber,
    supplierAddress,
    licenseNumber,
  } = req.body;

  try {
    const doesSupplierExist = await DRUG_SUPPLIER.findOne({
      where: {
        supplierEmail: supplierEmail,
        softDeleted: false,
      },
    });

    if (doesSupplierExist) {
      res.status(400).json({
        success: false,
        message: "Supplier already exists",
      });
      return;
    }

    const newDrugSupplier = await DRUG_SUPPLIER.create({
      supplierName,
      contactPersonName,
      supplierEmail,
      supplierPhoneNumber,
      supplierAddress,
      licenseNumber,
      softDeleted: false,
    });

    const findAllSuppliers = await DRUG_SUPPLIER.findAll({
      where: { softDeleted: false },
      order: [["createdAt", "ASC"]],
    });

    if (newDrugSupplier) {
      res.status(200).json({
        success: true,
        supplier: newDrugSupplier,
        allSuppliers: findAllSuppliers,
        message: "Drug Supplier added",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Failed to add drug supplier",
      });
    }
  } catch (error) {
    console.log("Error while adding new drug supplier", error);
    res.status(500).json({
      success: false,
      message: "Failed to add drug supplier",
    });
  }
};
export const findAllDrugSuppliers = async (req: Request, res: Response) => {
  try {
    const allSuppliers = await DRUG_SUPPLIER.findAll({
      where: { softDeleted: false },
      order: [["supplierName", "ASC"]],
    });

    if (allSuppliers.length > 0) {
      res.status(200).json({
        success: true,
        allSuppliers,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No suppliers found",
      });
    }
  } catch (error) {
    console.log("Error while fetching suppliers", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch suppliers",
    });
  }
};
export const findSupplierByUUID = async (req: Request, res: Response) => {
  try {
    const { supplierID } = req.params;
    const supplier = await DRUG_SUPPLIER.findByPk(supplierID);

    if (supplier && !supplier.softDeleted) {
      res.status(200).json({
        success: true,
        supplier,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }
  } catch (error) {
    console.log("Error while fetching supplier", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch supplier",
    });
  }
};
export const updateDrugSupplier = async (req: Request, res: Response) => {
  try {
    const { supplierID } = req.params;
    const {
      supplierName,
      contactPersonName,
      supplierEmail,
      supplierPhoneNumber,
      supplierAddress,
      licenseNumber,
    } = req.body;

    const supplier = await DRUG_SUPPLIER.findByPk(supplierID);

    const isSupplierSame =
      supplier?.supplierName === supplierName &&
      supplier?.contactPersonName === contactPersonName &&
      supplier?.supplierEmail === supplierEmail &&
      supplier?.supplierPhoneNumber === supplierPhoneNumber &&
      supplier?.supplierAddress === supplierAddress &&
      supplier?.licenseNumber === licenseNumber;

    if (supplier && !supplier.softDeleted && !isSupplierSame) {
      const updatedSupplier = await supplier.update({
        supplierName,
        contactPersonName,
        supplierEmail,
        supplierPhoneNumber,
        supplierAddress,
        licenseNumber,
      });

      const findAllSuppliers = await DRUG_SUPPLIER.findAll({
        where: { softDeleted: false },
        order: [["supplierName", "ASC"]],
      });

      res.status(200).json({
        success: true,
        supplier: updatedSupplier,
        allSuppliers: findAllSuppliers,
        message: "Supplier updated",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "You have made no changes",
      });
    }
  } catch (error) {
    console.log("Error while updating supplier", error);
    res.status(500).json({
      success: false,
      message: "Failed to update supplier",
    });
  }
};
export const deleteDrugSupplier = async (req: Request, res: Response) => {
  try {
    const { supplierID } = req.params;
    const supplier = await DRUG_SUPPLIER.findOne({
      where: {
        supplierID: supplierID,
        softDeleted: false,
      },
    });

    if (supplier) {
      await supplier.update({ softDeleted: true });

      const findAllSuppliers = await DRUG_SUPPLIER.findAll({
        where: { softDeleted: false },
        order: [["supplierName", "ASC"]],
      });

      res.status(200).json({
        success: true,
        message: "Supplier deleted",
        allSuppliers: findAllSuppliers,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }
  } catch (error) {
    console.log("Error while deleting supplier", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete supplier",
    });
  }
};
export const undoDeletedDrugSupplier = async (req: Request, res: Response) => {
  try {
    const { supplierID } = req.params;
    const supplier = await DRUG_SUPPLIER.findOne({
      where: {
        supplierID: supplierID,
        softDeleted: true,
      },
    });

    if (supplier) {
      await supplier.update({ softDeleted: false });

      const findAllSuppliers = await DRUG_SUPPLIER.findAll({
        where: { softDeleted: true },
        order: [["supplierName", "ASC"]],
      });

      res.status(200).json({
        success: true,
        message: "Supplier restored",
        allSuppliers: findAllSuppliers,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }
  } catch (error) {
    console.log("Error while restoring supplier", error);
    res.status(500).json({
      success: false,
      message: "Failed to restore supplier",
    });
  }
};
export const fetchAllDeletedDrugSuppliers = async (
  req: Request,
  res: Response
) => {
  try {
    const allDeletedSuppliers = await DRUG_SUPPLIER.findAll({
      where: {
        softDeleted: true,
      },
      order: [["supplierName", "ASC"]],
    });

    if (allDeletedSuppliers.length > 0) {
      res.status(200).json({
        success: true,
        allSuppliers: allDeletedSuppliers,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No deleted suppliers",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch deleted suppliers",
    });
  }
};
