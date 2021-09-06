import boom from '@hapi/boom';

import scopeDao from '../dao';

const createScope = async ({
  name,
  description,
  module,
  active,
}) => {
  const validateUniqueScopeForModule = await scopeDao.findScopeByNameAndModule({ name, module });

  if (validateUniqueScopeForModule) throw boom.badRequest(`Scope name: ${name} is already asigned for module ${module}`);

  const createdScope = await scopeDao.newScope({
    name, description, module, active,
  });

  if (!createdScope) throw boom.internal('Error trying to create new scope');
  return createdScope;
};

export default createScope;
