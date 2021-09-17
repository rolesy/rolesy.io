import boom from "@hapi/boom";

import accountDao from "../dao";

const createAccount = async ({
  name,
  description,
  billingInformation,
  contactInformation,
  active,
}) => {
  const validateUniqueAccount = await accountDao.findAccountByName(name);

  if (validateUniqueAccount) {
    throw boom.badRequest(`Account: ${name} already exists`);
  }

  const createdAccount = await accountDao.newAccount({
    name,
    description,
    billingInformation,
    contactInformation,
    active,
  });

  if (!createdAccount) {
    throw boom.internal("Error trying to create new account");
  }
  return createdAccount;
};

export default createAccount;
