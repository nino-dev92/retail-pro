import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import validate from "../middleware/validation.middleware";
import featureAdjustmentValidationSchema from "../validators/inventoryAdjustment.validator";
import { ROLES } from "../constants/roles";
import * as inventoryAdjustmentController from "../controllers/inventoryAdjustment.controller";

const router = express.Router();

/**
 * @swagger
 * /inventory-adjustments:
 *   get:
 *     summary: Retrieve all inventory adjustments
 *     tags:
 *       - Inventory Adjustments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventory adjustments retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.get(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  inventoryAdjustmentController.getAllInventoryAdjustments,
);

/**
 * @swagger
 * /inventory-adjustments/{id}:
 *   get:
 *     summary: Retrieve inventory adjustment by ID
 *     tags:
 *       - Inventory Adjustments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Inventory Adjustment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory adjustment retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Inventory adjustment not found
 */

router.get(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  inventoryAdjustmentController.findAdjustmentById,
);

/**
 * @swagger
 * /inventory-adjustments:
 *   post:
 *     summary: Create a new inventory adjustment
 *     tags:
 *       - Inventory Adjustments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryAdjustmentRequest'
 *     responses:
 *       201:
 *         description: Inventory adjustment created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.post(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  validate(featureAdjustmentValidationSchema),
  inventoryAdjustmentController.createInventoryAdjustment,
);

export default router;
