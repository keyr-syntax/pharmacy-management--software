import { Request, Response } from "express";
import ROUTE_OF_DRUG_ADMINISTRATION from "../../models/drug_model/routeOfDrugAdministrationModel";

export const addNewRouteOfDrugAdministration = async (
  req: Request,
  res: Response
) => {
  const { routeOfDrugAdministration } = req.body;
  try {
    const doesRouteOfDrugAdministrationExist =
      await ROUTE_OF_DRUG_ADMINISTRATION.findOne({
        where: {
          routeOfDrugAdministration: routeOfDrugAdministration,
          softDeleted: false,
        },
      });

    if (doesRouteOfDrugAdministrationExist) {
      res.status(400).json({
        success: false,
        message: "Route of drug administration already exists",
      });
      return;
    } else {
      const newRouteOfDrugAdministration =
        await ROUTE_OF_DRUG_ADMINISTRATION.create({
          routeOfDrugAdministration,
          softDeleted: false,
        });
      const findAllRoutesOfDrugAdministration =
        await ROUTE_OF_DRUG_ADMINISTRATION.findAll({
          where: { softDeleted: false },
          order: [["routeOfDrugAdministration", "ASC"]],
        });
      if (newRouteOfDrugAdministration) {
        res.status(200).json({
          success: true,
          newRouteOfDrugAdministration: newRouteOfDrugAdministration,
          findAllRoutesOfDrugAdministration: findAllRoutesOfDrugAdministration,
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Failed to add route of drug administration",
        });
        return;
      }
    }
  } catch (error) {
    console.log("Error while adding new route of drug administration", error);
    res.status(500).json({
      success: false,
      message: "Failed to add route of drug administration",
    });
  }
};

export const findAllRoutesOfDrugAdministration = async (
  req: Request,
  res: Response
) => {
  try {
    const findAllRoutesOfDrugAdministration =
      await ROUTE_OF_DRUG_ADMINISTRATION.findAll({
        where: { softDeleted: false },
        order: [["routeOfDrugAdministration", "ASC"]],
      });

    if (findAllRoutesOfDrugAdministration) {
      res.status(200).json({
        success: true,
        findAllRoutesOfDrugAdministration: findAllRoutesOfDrugAdministration,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Failed to find routes of drug administration",
      });
      return;
    }
  } catch (error) {
    console.log("Error while finding all routes of drug administration", error);
    res.status(500).json({
      success: false,
      message: "Failed to find routes of drug administration",
    });
  }
};

export const findRouteOfDrugAdministrationByUUID = async (
  req: Request,
  res: Response
) => {
  try {
    const { routeOfDrugAdministrationID } = req.params;
    const findRouteOfDrugAdministrationByPK =
      await ROUTE_OF_DRUG_ADMINISTRATION.findByPk(routeOfDrugAdministrationID);

    if (
      findRouteOfDrugAdministrationByPK &&
      !findRouteOfDrugAdministrationByPK.softDeleted
    ) {
      res.status(200).json({
        success: true,
        routeOfDrugAdministration: findRouteOfDrugAdministrationByPK,
      });
      return;
    } else {
      res.status(404).json({
        success: false,
        message: "Route of drug administration not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while finding route of drug administration", error);
    res.status(500).json({
      success: false,
      message: "Failed to find route drug administration by UUID",
    });
  }
};

export const updateRouteOfDrugAdministration = async (
  req: Request,
  res: Response
) => {
  try {
    const { routeOfDrugAdministrationID } = req.params;
    const { routeOfDrugAdministration } = req.body;
    const findRouteOfDrugAdministrationByPK =
      await ROUTE_OF_DRUG_ADMINISTRATION.findByPk(routeOfDrugAdministrationID);

    if (
      findRouteOfDrugAdministrationByPK &&
      findRouteOfDrugAdministrationByPK.routeOfDrugAdministration !==
        routeOfDrugAdministration
    ) {
      const updateRouteOfDrugAdministration =
        await findRouteOfDrugAdministrationByPK.update({
          routeOfDrugAdministration: routeOfDrugAdministration,
        });
      const findAllRouteOfDrugAdministration =
        await ROUTE_OF_DRUG_ADMINISTRATION.findAll({
          where: { softDeleted: false },
          order: [["routeOfDrugAdministration", "ASC"]],
        });
      if (updateRouteOfDrugAdministration) {
        res.status(200).json({
          success: true,
          routeOfDrugAdministration: updateRouteOfDrugAdministration,
          findAllRouteOfDrugAdministration: findAllRouteOfDrugAdministration,
        });
        return;
      } else {
        res.status(404).json({
          success: true,
          message: "Failed to update route of drug administration",
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
    console.log("Error while updating route of drug administration", error);
    res.status(500).json({
      success: false,
      message: "Failed to update route of drug administration",
    });
  }
};

export const deleteRouteOfDrugAdministration = async (
  req: Request,
  res: Response
) => {
  try {
    const { routeOfDrugAdministrationID } = req.params;
    const findRouteOfDrugAdministrationByPK =
      await ROUTE_OF_DRUG_ADMINISTRATION.findByPk(routeOfDrugAdministrationID);

    if (findRouteOfDrugAdministrationByPK) {
      const softDeleteRouteOfDrugAdministration =
        await findRouteOfDrugAdministrationByPK.update({
          softDeleted: true,
        });
      const findAllRouteOfDrugAdministration =
        await ROUTE_OF_DRUG_ADMINISTRATION.findAll({
          where: { softDeleted: false },
          order: [["routeOfDrugAdministration", "ASC"]],
        });
      if (softDeleteRouteOfDrugAdministration) {
        res.status(200).json({
          success: true,
          message: "Deleted",
          findAllRouteOfDrugAdministration: findAllRouteOfDrugAdministration,
        });
        return;
      } else {
        res.status(200).json({
          success: true,
          message: "Failed to delete route of drug administration",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Route of drug administration not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while deleting route of drug administration", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete route of drug administration",
    });
  }
};

export const undoDeletedRouteOfDrugAdministration = async (
  req: Request,
  res: Response
) => {
  const { routeOfDrugAdministrationID } = req.params;

  try {
    const findRouteOfDrugAdministrationByID =
      await ROUTE_OF_DRUG_ADMINISTRATION.findByPk(routeOfDrugAdministrationID);

    if (
      findRouteOfDrugAdministrationByID &&
      findRouteOfDrugAdministrationByID.softDeleted
    ) {
      const softDeleteRouteOfDrugAdministration =
        await findRouteOfDrugAdministrationByID.update({
          softDeleted: false,
        });

      if (softDeleteRouteOfDrugAdministration) {
        const findAllRoutesOfDrugAdministration =
          await ROUTE_OF_DRUG_ADMINISTRATION.findAll({
            where: { softDeleted: false },
            order: [["routeOfDrugAdministration", "ASC"]],
          });
        res.status(200).json({
          success: true,
          message: "Route of drug administration restored",
          findAllRoutesOfDrugAdministration: findAllRoutesOfDrugAdministration,
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Failed to restore route of drug administration",
        });
        return;
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Route of drug administration not found",
      });
      return;
    }
  } catch (error) {
    console.log("Error while restoring route of drug administration", error);
    res.status(500).json({
      success: false,
      message: "Failed to restore  route of drug administration",
    });
  }
};

export const fetchAllDeletedRouteOfDrugAdministration = async (
  req: Request,
  res: Response
) => {
  try {
    const findAllDeletedRouteOfDrugAdministration =
      await ROUTE_OF_DRUG_ADMINISTRATION.findAll({
        where: {
          softDeleted: true,
        },
        order: [["routeOfDrugAdministration", "ASC"]],
      });

    if (findAllDeletedRouteOfDrugAdministration) {
      res.status(200).json({
        success: true,
        findAllDeletedRouteOfDrugAdministration:
          findAllDeletedRouteOfDrugAdministration,
      });
      return;
    } else {
      res.status(200).json({
        success: true,
        message: "No deleted route of drug administration",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch deleted route of drug administration",
    });
  }
};
