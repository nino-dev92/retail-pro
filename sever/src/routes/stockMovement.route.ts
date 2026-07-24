import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import * as stockMovementController from "../controllers/stockMovement.controller";
import { ROLES } from "../constants/roles";

const router = express.Router();

router.get(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  stockMovementController.viewAllStockMovements,
);

router.get(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  stockMovementController.viewStockMovementById,
);

export default router;
