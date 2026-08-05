import express from "express";
import * as categoryController from "../controllers/category.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";
import validate from "../middleware/validation.middleware";
import categoryValidationSchema from "../validators/category.validator";
import authorizeRole from "../middleware/authorizeRole.middleware";
import { ROLES } from "../constants/roles";

const router = express.Router();

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.get("/", verifyJWT, categoryController.viewAllCategories);

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 example: Electrical products
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       201:
 *         description: Category created Successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

router.post(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  validate(categoryValidationSchema),
  categoryController.createCategory,
);

/**
 * @swagger
 * /category/{id}:
 *   patch:
 *     summary: Update a category
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 example: Updated description
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */

router.patch(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  categoryController.updateCategory,
);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - change
 *             properties:
 *               change:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */

router.delete(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.MANAGER, ROLES.ADMIN),
  categoryController.deleteCategory,
);

export default router;
