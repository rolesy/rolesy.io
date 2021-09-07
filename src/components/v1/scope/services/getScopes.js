import boom from '@hapi/boom';

import scopeDao from '../dao';

const getScopes = async ({
  page,
  limit,
  module,
  search,
  order = 'createdAt',
}) => {
  if (!page || !limit) throw boom.badRequest('page and limit are required');
  const query = { filters: { $and: [] } };

  if (module) {
    query.filters.$and.push({
      module,
    });
  }

  if (search && search.trim() !== '') {
    const regex = new RegExp(search, 'i');
    query.filters.$and.push({
      $or: [{
        name: regex,
      }, {
        description: regex,
      }],
    });
  }

  if (order) { query.order = { [order]: -1 }; }

  const result = await scopeDao.findScopes({
    page,
    limit,
    query: query.filters.$and.length
      ? { filters: { $and: query.filters.$and }, order: query.order }
      : { filters: { }, order: query.order },
  });

  return result;
};

export default getScopes;
