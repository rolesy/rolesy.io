import { Router } from "express";

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

router.get(
  "/list",
  loggedIn,
  requestSchemaHandler(accountSchema.getAccountsSchema, "query"),
  asyncHandler(accountController.getAccounts)
);

router.get(
  "/:id",
  loggedIn,
  requestSchemaHandler(accountSchema.getAccountByIdSchema, "params"),
  asyncHandler(accountController.getAccountById)
);

router.delete(
  "/:id",
  loggedIn,
  requestSchemaHandler(accountSchema.deleteAccountByIdSchema, "params"),
  asyncHandler(accountController.deleteAccountById)
);

export default router;
