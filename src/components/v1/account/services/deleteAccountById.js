import boom from "@hapi/boom";

import accountDao from "../dao";
import getAccountById from "./getAccountById";

const deleteAccountById = async (id) => {
  await getAccountById(id);
  await accountDao.deleteAccountById(id);

  return;
};

export default deleteAccountById;
