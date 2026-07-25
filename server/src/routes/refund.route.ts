import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import validate from "../middleware/validation.middleware";
import refundValidatorSchema from "../validators/refund.validator";
import { ROLES } from "../constants/roles";
import * as refundController from "../controllers/refund.controller";

const router = express.Router();

router.get(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  refundController.getAllRefunds,
);

router.post(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  validate(refundValidatorSchema),
  refundController.handleRefund,
);

export default router;
