import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import validate from "../middleware/validation.middleware";
import * as saleController from "../controllers/sale.controller";
import saleValidationSchema from "../validators/sale.validator";
import { ROLES } from "../constants/roles";

const router = express.Router();

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Retrieve all sales
 *     tags:
 *       - Sales
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sales retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER, ROLES.CASHIER),
  saleController.viewAllSales,
);

/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Retrieve sales by cashier ID
 *     tags:
 *       - Sales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Cashier ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cashier sales retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Cashier not found
 */
router.get(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.CASHIER, ROLES.ADMIN, ROLES.MANAGER),
  saleController.viewSaleByCashierId,
);

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Create a new sale
 *     tags:
 *       - Sales
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaleRequest'
 *     responses:
 *       201:
 *         description: Sale created successfully
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
  authorizeRole(ROLES.CASHIER),
  validate(saleValidationSchema),
  saleController.createSale,
);

export default router;
