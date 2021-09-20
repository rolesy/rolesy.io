import accountModel from "../../../../models/account";

const findAccountByName = (name) =>
  accountModel
    .findOne({
      name,
    })
    .lean()
    .exec();

const newAccount = (account) => accountModel.create({ ...account });

const getAccountById = (id) => accountModel.findOne({ _id: id });

const findAccounts = ({ page, limit, query }) =>
  accountModel
    .find(query.filters)
    .skip(Number(page))
    .limit(Number(limit))
    .sort({ ...query.order })
    .lean()
    .exec();

const findAccountsCount = ({ query }) =>
  accountModel.find(query.filters).countDocuments().lean().exec();

const deleteAccountById = (id) => accountModel.remove({ _id: id });

const updateAccount = (id, account) =>
  accountModel.findOneAndUpdate(id, { ...account });

export default {
  findAccountByName,
  newAccount,
  getAccountById,
  findAccounts,
  findAccountsCount,
  updateAccount,
  deleteAccountById,
};
