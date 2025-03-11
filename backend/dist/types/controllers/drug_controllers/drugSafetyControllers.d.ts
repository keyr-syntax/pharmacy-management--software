import { Request, Response } from "express";
export declare const addNewDrugSafety: (req: Request, res: Response) => Promise<void>;
export declare const findAllDrugSafety: (req: Request, res: Response) => Promise<void>;
export declare const findSafetyByUUID: (req: Request, res: Response) => Promise<void>;
export declare const updateDrugSafety: (req: Request, res: Response) => Promise<void>;
export declare const deleteDrugSafety: (req: Request, res: Response) => Promise<void>;
export declare const undoDeletedDrugSafety: (req: Request, res: Response) => Promise<void>;
export declare const fetchAllDeletedDrugSafety: (req: Request, res: Response) => Promise<void>;
