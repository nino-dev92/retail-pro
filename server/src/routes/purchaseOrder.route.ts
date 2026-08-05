import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import validate from "../middleware/validation.middleware";
import purchaseOrderValidationSchema from "../validators/purchaseOrder.validator";
import { ROLES } from "../constants/roles";
import * as purchaseOrderController from "../controllers/purchaseOrder.controller";

const router = express.Router();

/**
 * @swagger
 * /purchase-order:
 *   post:
 *     summary: Create a purchase order
 *     tags:
 *       - Purchase Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PurchaseOrderRequest'
 *     responses:
 *       201:
 *         description: Purchase order created successfully
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
  validate(purchaseOrderValidationSchema),
  purchaseOrderController.addPurchaseOrder,
);

/**
 * @swagger
 * /purchase-order:
 *   get:
 *     summary: Retrieve all purchase orders
 *     tags:
 *       - Purchase Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Purchase orders retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.get(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  purchaseOrderController.getAllPurchaseOrders,
);

/**
 * @swagger
 * /purchase-order/{id}:
 *   get:
 *     summary: Retrieve purchase order by ID
 *     tags:
 *       - Purchase Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Purchase Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Purchase order retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Purchase order not found
 */

router.get(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  purchaseOrderController.getPurchaseOrderById,
);

export default router;
