import accountServices from '../services';

const createAccount = async (req, res) => {
  res.status(201).json({
    status: 201,
    message: 'Success',
    data: await accountServices.createAccount({ ...req.body }),
  });
};

const getAccountById = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Succcess',
    data: await accountServices.getAccountById(req.params.id),
  });
};

export default {
  createAccount,
  getAccountById,
};
