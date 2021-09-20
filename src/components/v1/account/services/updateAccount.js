import boom from "@hapi/boom";
import accountDao from "../dao";
import getAccountById from "../services/getAccountById";

const updateAccount = async (
  id,
  { name, description, billingInformation, contactInformation, active }
) => {
  await getAccountById(id);
  const updateAccount = await accountDao.updateAccount(id, {
    name,
    description,
    billingInformation,
    contactInformation,
    active,
  });

  if (!updateAccount) {
    throw boom.internal("Error trying to update new account");
  }

  const updatedAccount = await getAccountById(id);
  return updatedAccount;
};

export default updateAccount;
