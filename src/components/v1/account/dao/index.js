import accountModel from '../../../../models/account';

const findAccountByName = ({ name }) => accountModel
  .findOne({
    name,
  })
  .lean()
  .exec();

const newAccount = (account) => accountModel.create({ ...account });

export default {
  findAccountByName,
  newAccount,
};
