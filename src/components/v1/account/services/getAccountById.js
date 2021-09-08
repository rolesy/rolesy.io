import boom from "@hapi/boom";

import accountDao from "../dao";

const getAccountById = async (id) => {
  const accountDetail = await accountDao.getAccountById(id);

  if (!accountDetail) throw boom.badRequest(`Account with ID: ${id} not found`);
  return accountDetail;
};

export default getAccountById;
