import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import validate from "../middleware/validation.middleware";
import purchaseOrderValidationSchema from "../validators/purchaseOrder.validator";
import { ROLES } from "../constants/roles";
import * as purchaseOrderController from "../controllers/purchaseOrder.controller";

const router = express.Router();

router.post(
  "/create",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  validate(purchaseOrderValidationSchema),
  purchaseOrderController.addPurchaseOrder,
);

router.get(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  purchaseOrderController.getAllPurchaseOrders,
);

router.get(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  purchaseOrderController.getPurchaseOrderById,
);

export default router;
