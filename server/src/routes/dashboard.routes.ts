import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import * as dashboardController from "../controllers/dashboard.controller";
import { ROLES } from "../constants/roles";

const router = express.Router();

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard reports
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All dasjboard reports retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.get(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  dashboardController.dashboard,
);

export default router;
