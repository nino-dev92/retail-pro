import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import { ROLES } from "../constants/roles";
import * as userController from "../controllers/users.controller";

const router = express.Router();

router.get(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  userController.findAllUsers,
);

router.get(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  userController.findUserById,
);

router.get(
  "/workers/:role",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  userController.findUsersByRole,
);

router.patch(
  "/:id",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  userController.UpdateUser,
);

export default router;
