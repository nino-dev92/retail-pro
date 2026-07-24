import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import validate from "../middleware/validation.middleware";
import * as saleController from "../controllers/sale.controller";
import saleValidationSchema from "../validators/sale.validator";
import { ROLES } from "../constants/roles";

const router = express.Router();

router.get(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER, ROLES.CASHIER),
  saleController.viewAllSales,
);

router.get(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  saleController.viewSaleByCashierId,
);

router.post(
  "/",
  verifyJWT,
  authorizeRole(ROLES.CASHIER),
  validate(saleValidationSchema),
  saleController.createSale,
);

export default router;
