import { Request, Response } from "express";
export declare const addNewDrugInventory: (req: Request, res: Response) => Promise<void>;
export declare const findAllDrugInventories: (req: Request, res: Response) => Promise<void>;
export declare const findInventoryByUUID: (req: Request, res: Response) => Promise<void>;
export declare const updateDrugInventory: (req: Request, res: Response) => Promise<void>;
export declare const deleteDrugInventory: (req: Request, res: Response) => Promise<void>;
export declare const undoDeletedDrugInventory: (req: Request, res: Response) => Promise<void>;
export declare const fetchAllDeletedDrugInventory: (req: Request, res: Response) => Promise<void>;
