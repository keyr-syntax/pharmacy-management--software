import { Request, Response } from "express";
export declare const addNewDrugSupplier: (req: Request, res: Response) => Promise<void>;
export declare const findAllDrugSuppliers: (req: Request, res: Response) => Promise<void>;
export declare const findSupplierByUUID: (req: Request, res: Response) => Promise<void>;
export declare const updateDrugSupplier: (req: Request, res: Response) => Promise<void>;
export declare const deleteDrugSupplier: (req: Request, res: Response) => Promise<void>;
export declare const undoDeletedDrugSupplier: (req: Request, res: Response) => Promise<void>;
export declare const fetchAllDeletedDrugSuppliers: (req: Request, res: Response) => Promise<void>;
