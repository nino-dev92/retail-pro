import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import validate from "../middleware/validation.middleware";
import featureAdjustmentValidationSchema from "../validators/inventoryAdjustment.validator";
import { ROLES } from "../constants/roles";
import * as inventoryAdjustmentController from "../controllers/inventoryAdjustment.controller";

const router = express.Router();

router.get(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  inventoryAdjustmentController.getAllInventoryAdjustments,
);

router.get(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  inventoryAdjustmentController.findAdjustmentById,
);

router.post(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  validate(featureAdjustmentValidationSchema),
  inventoryAdjustmentController.createInventoryAdjustment,
);

export default router;
