import { Request, Response } from "express";
export declare const addNewDrugPricing: (req: Request, res: Response) => Promise<void>;
export declare const findAllDrugPricing: (req: Request, res: Response) => Promise<void>;
export declare const findPricingByUUID: (req: Request, res: Response) => Promise<void>;
export declare const updateDrugPricing: (req: Request, res: Response) => Promise<void>;
export declare const deleteDrugPricing: (req: Request, res: Response) => Promise<void>;
export declare const undoDeletedDrugPricing: (req: Request, res: Response) => Promise<void>;
export declare const fetchAllDeletedDrugPricing: (req: Request, res: Response) => Promise<void>;
