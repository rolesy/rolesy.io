import accountModel from '../../../../models/account';

const findAccountByName = (name) => accountModel
  .findOne({
    name,
  })
  .lean()
  .exec();

const newAccount = (account) => accountModel.create({ ...account });

const getAccountById = (id) => accountModel.findOne({ _id: id });

export default {
  findAccountByName,
  newAccount,
  getAccountById,
};
