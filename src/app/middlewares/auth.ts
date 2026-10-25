import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import { User } from "../modules/User/user.model";

export interface CustomRequest extends Request {
  user?: JwtPayload & { id: string; email: string; type: "admin" | "user" };
}

const auth = (...requiredRoles: string[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          status: "fail",
          message: "You are not logged in. Please log in to get access.",
        });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({
          status: "fail",
          message: "Invalid token format.",
        });
      }

      let decoded: any;
      try {
        decoded = jwt.verify(token, config.jwt_secret as string);
      } catch (err) {
        return res.status(401).json({
          status: "fail",
          message: "Invalid or expired token.",
        });
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({
          status: "fail",
          message: "The user belonging to this token no longer exists.",
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          status: "fail",
          message: "This user account is inactive.",
        });
      }

      if (requiredRoles.length && !requiredRoles.includes(user.type)) {
        return res.status(403).json({
          status: "fail",
          message: "You do not have permission to perform this action.",
        });
      }

      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
