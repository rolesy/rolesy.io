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
  const skip = (Number(page) * Number(limit)) - limit;
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

  const [result, count] = await Promise.all([
    scopeDao.findScopes({
      page: skip,
      limit,
      query: query.filters.$and.length
        ? { filters: { $and: query.filters.$and }, order: query.order }
        : { filters: { }, order: query.order },
    }),
    scopeDao.findScopesCount({
      query: query.filters.$and.length
        ? { filters: { $and: query.filters.$and }, order: query.order }
        : { filters: { }, order: query.order },
    }),
  ]);

  return { scopes: result, records: count };
};

export default getScopes;
