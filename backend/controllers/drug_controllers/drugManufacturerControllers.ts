import { Request, Response } from "express";
import DRUG_MANUFACTURERS from "../../models/drug_model/drugManufacturersModel";

export const addNewDrugManufacturer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { manufacturerName, contactName, phoneNumber, licenseNumber } =
    req.body;
  try {
    const doesDrugManufacturerExist = await DRUG_MANUFACTURERS.findOne({
      where: {
        manufacturerName: manufacturerName,
        contactName: contactName,
        phoneNumber: phoneNumber,
        licenseNumber: licenseNumber,
        softDeleted: false,
      },
    });

    if (doesDrugManufacturerExist) {
      res.status(400).json({
        success: false,
        message: "Manufacturer already exists",
      });
      return;
    } else {
      const newDrugManufacturer = await DRUG_MANUFACTURERS.create({
        manufacturerName: manufacturerName,
        contactName: contactName,
        phoneNumber: phoneNumber,
        licenseNumber: licenseNumber,
        softDeleted: false,
      });
      const findAllDrugManufacturers = await DRUG_MANUFACTURERS.findAll({
        where: { softDeleted: false },
        order: [["manufacturerName", "ASC"]],
      });
      if (findAllDrugManufacturers) {
        res.status(200).json({
          success: true,
          drugManufacturer: newDrugManufacturer,
          findAllDrugManufacturers: findAllDrugManufacturers,
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Failed to add drug manufacturer",
        });
        return;
      }
    }
  } catch (error) {
    console.log("Error while adding new drug manufacturer", error);
    res.status(500).json({
      success: false,
      message: "Failed to add drug manufacturer",
    });
    return;
  }
};

export const findAllDrugManufacturers = async (req: Request, res: Response) => {
  try {
    const findAllDrugManufacturers = await DRUG_MANUFACTURERS.findAll({
      where: { softDeleted: false },
      order: [["manufacturerName", "ASC"]],
    });

    if (findAllDrugManufacturers) {
      res.status(200).json({
        success: true,
        findAllDrugManufacturers: findAllDrugManufacturers,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Failed to find drug manufacturers",
      });
      return;
    }
  } catch (error) {
    console.log("Error while finding drug manufacturers", error);
    res.status(500).json({
      success: false,
      message: "Failed to find drug manufacturers",
    });
  }
};

export const findDrugManufacturerByUUID = async (
  req: Request,
  res: Response
) => {
  try {
    const { manufacturerID } = req.params;
    const findDrugManufacturerByPK = await DRUG_MANUFACTURERS.findByPk(
      manufacturerID
    );

    if (findDrugManufacturerByPK && !findDrugManufacturerByPK.softDeleted) {
      res.status(200).json({
        success: true,
        drugManufacturer: findDrugManufacturerByPK,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Drug manufacturer not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while finding Drug manufacturer", error);
    res.status(500).json({
      success: false,
      message: "Failed to find Drug manufacturer",
    });
  }
};

export const updateDrugManufacturer = async (req: Request, res: Response) => {
  try {
    const { manufacturerID } = req.params;
    const { manufacturerName, contactName, phoneNumber, licenseNumber } =
      req.body;
    const findDrugManufacturerByPK = await DRUG_MANUFACTURERS.findByPk(
      manufacturerID
    );

    if (
      (findDrugManufacturerByPK &&
        findDrugManufacturerByPK.manufacturerName !== manufacturerName) ||
      findDrugManufacturerByPK?.contactName !== contactName ||
      findDrugManufacturerByPK?.phoneNumber !== phoneNumber ||
      findDrugManufacturerByPK?.licenseNumber !== licenseNumber
    ) {
      const updateDrugManufacturer = await findDrugManufacturerByPK?.update({
        manufacturerName: manufacturerName,
        contactName: contactName,
        phoneNumber: phoneNumber,
        licenseNumber: licenseNumber,
      });
      const findAllDrugManufacturers = await DRUG_MANUFACTURERS.findAll({
        where: { softDeleted: false },
        order: [["manufacturerName", "ASC"]],
      });
      if (updateDrugManufacturer) {
        res.status(200).json({
          success: true,
          drugManufacturer: updateDrugManufacturer,
          findAllDrugManufacturers: findAllDrugManufacturers,
        });
        return;
      } else {
        res.status(404).json({
          success: true,
          message: "Failed to update drug manufacturer",
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
    console.log("Error while updating  drug manufacturer", error);
    res.status(500).json({
      success: false,
      message: "Failed to update drug manufacturer",
    });
  }
};

export const deleteDrugManufacturer = async (req: Request, res: Response) => {
  try {
    const { manufacturerID } = req.params;
    const findDrugManufacturerByPK = await DRUG_MANUFACTURERS.findByPk(
      manufacturerID
    );

    if (findDrugManufacturerByPK && !findDrugManufacturerByPK.softDeleted) {
      const softDeleteDrugManufacturer = await findDrugManufacturerByPK.update({
        softDeleted: true,
      });
      const findAllDrugManufacturers = await DRUG_MANUFACTURERS.findAll({
        where: { softDeleted: false },
        order: [["manufacturerName", "ASC"]],
      });
      if (softDeleteDrugManufacturer) {
        res.status(200).json({
          success: true,
          message: "Deleted",
          findAllDrugManufacturers: findAllDrugManufacturers,
        });
        return;
      } else {
        res.status(200).json({
          success: true,
          message: "Failed to delete drug manufacturer",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Drug manufacturer not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while deleting drug manufacturer", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete drug manufacturer",
    });
  }
};

export const undoDeletedDrugManufacturer = async (
  req: Request,
  res: Response
) => {
  const { manufacturerID } = req.params;

  try {
    const findDrugManufacturerID = await DRUG_MANUFACTURERS.findByPk(
      manufacturerID
    );

    if (findDrugManufacturerID && findDrugManufacturerID.softDeleted) {
      const softDeleteDrugManufacturer = await findDrugManufacturerID.update({
        softDeleted: false,
      });

      if (softDeleteDrugManufacturer) {
        const findAllDrugManufacturers = await DRUG_MANUFACTURERS.findAll({
          where: {
            softDeleted: true,
          },
          order: [["manufacturerName", "ASC"]],
        });
        res.status(200).json({
          success: true,
          message: "Drug manufacturer restored",
          findAllDrugManufacturers: findAllDrugManufacturers,
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Failed to restore drug manufacturer",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Drug manufacturer not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while restoring drug manufacturer", error);
    res.status(500).json({
      success: false,
      message: "Failed to restore drug manufacturer",
    });
  }
};

export const fetchAllDeletedDrugManufacturers = async (
  req: Request,
  res: Response
) => {
  try {
    const findAllDeletedDrugManufacturers = await DRUG_MANUFACTURERS.findAll({
      where: {
        softDeleted: true,
      },
      order: [["manufacturerName", "ASC"]],
    });

    if (findAllDeletedDrugManufacturers) {
      res.status(200).json({
        success: true,
        findAllDeletedDrugManufacturers: findAllDeletedDrugManufacturers,
      });
      return;
    } else {
      res.status(200).json({
        success: true,
        message: "No deleted drug manufacturer",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch deleted drug manufacturer",
    });
  }
};
