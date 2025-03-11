import { Request, Response, NextFunction } from "express";
export declare const userAuthenticationMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const managerAuthenticationMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const adminAuthenticationMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
