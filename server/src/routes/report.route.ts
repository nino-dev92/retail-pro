import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import { ROLES } from "../constants/roles";
import * as reportController from "../controllers/report.controller";

const router = express.Router();

router.get(
  "/sales",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  reportController.salesReport,
);

router.get(
  "/purchases",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  reportController.purchaseReport,
);

router.get(
  "/refunds",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  reportController.refundReport,
);

router.get(
  "/stock-movements",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  reportController.stockMovementReport,
);

router.get(
  "/inventory",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  reportController.inventoryReport,
);

router.get(
  "/summary",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  reportController.summaryReport,
);

export default router;
