import { Router } from "express";

import asyncHandler from "../../../utils/middlewares/asyncHandler";
import asyncHandler from "../../../utils/middlewares/asyncHandler";
import requestSchemaHandler from "../../../utils/middlewares/requestSchemaHandler";
import loggedIn from "../../../utils/middlewares/autheticationHandler";
import accountController from "./controllers";

import accountSchema from "./schemas";

const router = Router();

router.post(
  "/",
  loggedIn,
  requestSchemaHandler(accountSchema.createAccountSchema),
  asyncHandler(accountController.createAccount)
);

export default router;
