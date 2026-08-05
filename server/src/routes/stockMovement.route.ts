import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import * as stockMovementController from "../controllers/stockMovement.controller";
import { ROLES } from "../constants/roles";

const router = express.Router();

/**
 * @swagger
 * /stock-movement:
 *   get:
 *     summary: Retrieve all stock movements
 *     tags:
 *       - Stock Movements
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stock movements retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.get(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  stockMovementController.viewAllStockMovements,
);

/**
 * @swagger
 * /stock-movement/{id}:
 *   get:
 *     summary: Retrieve stock movement by ID
 *     tags:
 *       - Stock Movements
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Stockmovement ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stock movements retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.get(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  stockMovementController.viewStockMovementById,
);

export default router;
