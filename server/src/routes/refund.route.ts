import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import validate from "../middleware/validation.middleware";
import refundValidatorSchema from "../validators/refund.validator";
import { ROLES } from "../constants/roles";
import * as refundController from "../controllers/refund.controller";

const router = express.Router();

/**
 * @swagger
 * /refund:
 *   get:
 *     summary: Retrieve all refunds
 *     tags:
 *       - Refunds
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All refunds retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.get(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  refundController.getAllRefunds,
);

/**
 * @swagger
 * /refunds:
 *   post:
 *     summary: Create a refund
 *     description: Creates a refund transaction for returned products.
 *     tags:
 *       - Refunds
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - total
 *               - reason
 *             properties:
 *               items:
 *                 type: array
 *                 description: List of refunded products
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: 6854d9dbf4e2c94d9f50c321
 *                     quantity:
 *                       type: number
 *                       example: 2
 *                     price:
 *                       type: number
 *                       example: 300
 *               total:
 *                 type: number
 *                 example: 600
 *               reason:
 *                 type: string
 *                 example: Damaged goods
 *     responses:
 *       201:
 *         description: Refund created successfully
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
  validate(refundValidatorSchema),
  refundController.handleRefund,
);

export default router;
