import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import { ROLES } from "../constants/roles";
import * as reportController from "../controllers/report.controller";

const router = express.Router();

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Retrieve all sales reports
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sales reports retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.get(
  "/sales",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  reportController.salesReport,
);

/**
 * @swagger
 * /purchase:
 *   get:
 *     summary: Retrieve all purchase reports
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Purchase reports retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.get(
  "/purchases",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  reportController.purchaseReport,
);

/**
 * @swagger
 * /refunds:
 *   get:
 *     summary: Retrieve all refund reports
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Refund reports retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.get(
  "/refunds",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  reportController.refundReport,
);

/**
 * @swagger
 * /stock-movements:
 *   get:
 *     summary: Retrieve all stock movement reports
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stock movement reports retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.get(
  "/stock-movements",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  reportController.stockMovementReport,
);

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Retrieve all inventory reports
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventory reports retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.get(
  "/inventory",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  reportController.inventoryReport,
);

/**
 * @swagger
 * /summary:
 *   get:
 *     summary: Retrieve all summary reports
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary reports retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.get(
  "/summary",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  reportController.summaryReport,
);

export default router;
