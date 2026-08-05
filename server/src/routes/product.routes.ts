import express from "express";
import * as productController from "../controllers/product.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import validate from "../middleware/validation.middleware";
import productValidationSchema from "../validators/product.validator";
import { ROLES } from "../constants/roles";

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.get(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.CASHIER, ROLES.MANAGER),
  productController.getAllProducts,
);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */

router.get(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.CASHIER, ROLES.MANAGER),
  productController.getProductById,
);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - costPrice
 *               - supplier
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 16
 *               description:
 *                 type: string
 *                 example: Apple smartphone
 *               price:
 *                 type: number
 *                 example: 1200
 *               costPrice:
 *                 type: number
 *                 example: 900
 *               quantity:
 *                 type: number
 *                 default: 0
 *               supplier:
 *                 type: string
 *                 format: objectId
 *                 example: 6854d9dbf4e2c94d9f50c321
 *               category:
 *                 type: string
 *                 format: objectId
 *                 example: 6854d9dbf4e2c94d9f50c123
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.post(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  validate(productValidationSchema),
  productController.createNewProduct,
);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update a product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
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
 *                 example: Samsung Galaxy S25
 *               description:
 *                 type: string
 *                 example: Updated product description
 *               price:
 *                 type: number
 *                 example: 1400
 *               costPrice:
 *                 type: number
 *                 example: 1000
 *               quantity:
 *                 type: number
 *                 example: 25
 *               supplier:
 *                 type: string
 *                 format: objectId
 *                 example: 6854d9dbf4e2c94d9f50c321
 *               category:
 *                 type: string
 *                 format: objectId
 *                 example: 6854d9dbf4e2c94d9f50c123
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */

router.patch(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  productController.updateProductById,
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Soft delete a product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */

router.delete(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  productController.deleteProductById,
);

export default router;
