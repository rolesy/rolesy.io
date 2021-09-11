import boom from "@hapi/boom";

import accountDao from "../dao";

const getAccounts = async ({ page, limit, search, order = "createAt" }) => {
  const skip = Number(page) * Number(limit) - limit;
  const query = { filters: { $and: [] } };

  if (search && search.trim() !== "") {
    const regex = new RegExp(search, "i");
    query.filters.$and.push({
      $or: [
        {
          name: regex,
        },
        {
          description: regex,
        },
      ],
    });
  }

  if (order) {
    query.order = { [order]: -1 };
  }

  const [result, count] = await Promise.all([
    accountDao.findAccounts({
      page: skip,
      limit,
      query: query.filters.$and.length
        ? { filters: { $and: query.filters.$and }, order: query.order }
        : { filters: {}, order: query.order },
    }),

    accountDao.findAccountsCount({
      query: query.filters.$and.length
        ? { filters: { $and: query.filters.$and }, order: query.order }
        : { filters: {}, order: query.order },
    }),
  ]);

  return { accounts: result, records: count };
};

export default getAccounts;
