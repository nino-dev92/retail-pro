import express from "express";
import verifyJWT from "../middleware/verifyJWT.middleware";
import authorizeRole from "../middleware/authorizeRole.middleware";
import * as dashboardController from "../controllers/dashboard.controller";
import { ROLES } from "../constants/roles";

const router = express.Router();

router.get(
  "/",
  verifyJWT,
  authorizeRole(ROLES.ADMIN, ROLES.MANAGER),
  dashboardController.dashboard,
);

export default router;
