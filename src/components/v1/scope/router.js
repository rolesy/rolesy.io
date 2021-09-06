import { Router } from 'express';

import asyncHandler from '../../../utils/middlewares/asyncHandler';
import requestSchemaHandler from '../../../utils/middlewares/requestSchemaHandler';
import loggedIn from '../../../utils/middlewares/autheticationHandler';
import scopeController from './controllers';

import scopeSchemas from './schemas';

const router = Router();

router.post('/', loggedIn, requestSchemaHandler(scopeSchemas.createScopeSchema), asyncHandler(scopeController.createScope));
router.get('/:id', loggedIn, requestSchemaHandler(scopeSchemas.getScopeByIdSchema, 'params'), asyncHandler(scopeController.getScopeById));

export default router;
