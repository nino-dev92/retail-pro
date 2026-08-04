import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import validate from "../middleware/validation.middleware";
import supplierValidatorSchema from "../validators/supplier.validator";
import * as supplierController from "../controllers/supplier.controller";
import { ROLES } from "../constants/roles";

const router = express.Router();

router.get(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  supplierController.getAllSuppliers,
);

router.get(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  supplierController.getSupplierbyId,
);

router.post(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  validate(supplierValidatorSchema),
  supplierController.createSupplier,
);

router.patch(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  supplierController.editSupplier,
);

router.patch(
  "/:id/status",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  supplierController.updateSupplierStatus,
);

export default router;
