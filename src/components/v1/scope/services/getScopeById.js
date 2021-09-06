import boom from '@hapi/boom';

import scopeDao from '../dao';

const getScopeById = async (id) => {
  const scope = await scopeDao.findScopeById(id);

  if (!scope) throw boom.badRequest(`Scope with ID: ${id} not found`);

  return scope;
};

export default getScopeById;
