import boom from "@hapi/boom";

import accountDao from "../DAO";

const createAccount = async ({
  name,
  description,
  billing,
  contactInformation,
  active,
}) => {
  const validateUniqueAccount = await accountDao.findAccountByName({ name });

  if (validateUniqueAccount)
    throw boom.badRequest(`Account: ${name} already exists`);

  const createdAccount = await accountDao.newAccount({
    name,
    description,
    billing,
    contactInformation,
    active,
  });

  if (!createdAccount)
    throw boom.internal("Error trying to create new account");
  return createdAccount;
};

export default createAccount;
