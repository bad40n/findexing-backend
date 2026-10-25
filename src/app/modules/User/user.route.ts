import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/me", auth(), UserController.getMe as any);
router.patch("/profile", auth(), UserController.updateProfile as any);

// Admin-only user management
router.get("/", auth("admin"), UserController.getAllUsers as any);
router.patch("/:id/type", auth("admin"), UserController.updateUserType as any);
router.patch("/:id/active", auth("admin"), UserController.toggleUserActiveStatus as any);
router.delete("/:id", auth("admin"), UserController.deleteUser as any);

export const UserRoutes = router;