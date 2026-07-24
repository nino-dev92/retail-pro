import express from "express";
import * as productController from "../controllers/product.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import validate from "../middleware/validation.middleware";
import productValidationSchema from "../validators/product.validator";
import { ROLES } from "../constants/roles";

const router = express.Router();

router.get(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.CASHIER, ROLES.MANAGER),
  productController.getAllProducts,
);

router.get(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.CASHIER, ROLES.MANAGER),
  productController.getProductById,
);

router.post(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  validate(productValidationSchema),
  productController.createNewProduct,
);

router.patch(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  productController.updateProductById,
);

router.delete(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  productController.deleteProductById,
);

export default router;
