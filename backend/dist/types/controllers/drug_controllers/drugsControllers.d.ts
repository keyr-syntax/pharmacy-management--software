import { Request, Response } from "express";
export declare const addNewDrug: (req: Request, res: Response) => Promise<void>;
export declare const findAllDrugs: (req: Request, res: Response) => Promise<void>;
export declare const findDrugByUUID: (req: Request, res: Response) => Promise<void>;
export declare const updateDrugDetails: (req: Request, res: Response) => Promise<void>;
export declare const deleteDrug: (req: Request, res: Response) => Promise<void>;
export declare const undoDeletedDrug: (req: Request, res: Response) => Promise<void>;
export declare const fetchAllDeletedDrugs: (req: Request, res: Response) => Promise<void>;
