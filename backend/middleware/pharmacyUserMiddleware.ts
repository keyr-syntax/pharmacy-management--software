import pharmacyUser from "../models/pharmacyUserModel";
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import dotenv from "dotenv";
dotenv.config();

const opts = {
  jwtFromRequest: (req: Request) => {
    return req.cookies ? req.cookies.pharmacyApp : null;
  },
  secretOrKey: process.env.TOKEN_SECRET!,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await pharmacyUser.findByPk(jwtPayload.id);
      return user ? done(null, user) : done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export const userAuthenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  interface AuthenticatedRequest extends Request {
    user?: any;
  }

  const authenticationMiddleware = passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Access denied",
        });
      }

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Access denied",
        });
      } else if (
        (user.role === "pharmacist" && user.isBlocked === false) ||
        (user.role === "manager" && user.isBlocked === false) ||
        (user.role === "admin" && user.isBlocked === false)
      ) {
        (req as AuthenticatedRequest).user = user;
        next();
      } else {
        res.status(404).json({
          success: false,
          message: "Access denied",
        });
        return;
      }
    }
  );

  authenticationMiddleware(req, res, next);
};

export const managerAuthenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  interface AuthenticatedRequest extends Request {
    user?: any;
  }

  const managerAuthenticationMiddleware = passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: any, info: any) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Access denied",
        });
        return;
      }

      if (!user) {
        res.status(404).json({
          success: false,
          message: "Access denied",
        });
        return;
      } else if (
        (user.role === "manager" && user.isBlocked === false) ||
        (user.role === "admin" && user.isBlocked === false)
      ) {
        (req as AuthenticatedRequest).user = user;
        next();
      } else {
        res.status(404).json({
          success: false,
          message: "Access denied",
        });
        return;
      }
    }
  );

  managerAuthenticationMiddleware(req, res, next);
};

export const adminAuthenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  interface AuthenticatedRequest extends Request {
    user?: any;
  }

  const adminAuthenticationMiddleware = passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: any, info: any) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Access denied",
        });
        return;
      }

      if (!user) {
        res.status(404).json({
          success: false,
          message: "Access denied",
        });
        return;
      } else if (user.role === "admin" && user.isBlocked === false) {
        (req as AuthenticatedRequest).user = user;
        next();
      } else {
        res.status(404).json({
          success: false,
          message: "Access denied",
        });
        return;
      }
    }
  );

  adminAuthenticationMiddleware(req, res, next);
};
