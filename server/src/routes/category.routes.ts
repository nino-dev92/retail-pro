import express from "express";
import * as categoryController from "../controllers/category.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";
import validate from "../middleware/validation.middleware";
import categoryValidationSchema from "../validators/category.validator";
import authorizeRole from "../middleware/authorizeRole.middleware";
import { ROLES } from "../constants/roles";

const router = express.Router();

router.get("/", verifyJWT, categoryController.viewAllCategories);

router.post(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  validate(categoryValidationSchema),
  categoryController.createCategory,
);

router.patch(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  categoryController.updateCategory,
);

router.delete(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.MANAGER, ROLES.ADMIN),
  categoryController.deleteCategory,
);

export default router;
