import express from "express";
const router = express.Router();
import * as authController from "../controllers/auth.controller";
import userValidationSchema from "../validators/auth.validator";
import validate from "../middleware/validation.middleware";

router.post("/signup", authController.signup);

router.post("/login", validate(userValidationSchema), authController.login);

router.post("/logout", authController.logout);

router.post("/refresh", authController.refresh);

export default router;
